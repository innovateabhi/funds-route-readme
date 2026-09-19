from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from database import db
from sqlalchemy import text


admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/admin"
)


# =========================================================
# ADMIN LOGIN
# =========================================================

@admin_bp.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        # Simple prototype admin credentials
        if username == "admin" and password == "admin123":

            session["admin_logged_in"] = True
            session["admin_username"] = username

            return redirect(url_for("admin.dashboard"))

        flash("Invalid admin username or password.")

    return render_template("admin/login.html")


# =========================================================
# ADMIN DASHBOARD
# =========================================================

@admin_bp.route("/")
def dashboard():

    if not session.get("admin_logged_in"):
        return redirect(url_for("admin.login"))

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                p.full_name,
                c.email,
                c.phone,
                k.document_type,
                k.document_number,
                k.document_file,
                k.selfie_file,
                k.verification_status
            FROM users u
            LEFT JOIN user_profiles p
                ON p.user_id = u.id
            LEFT JOIN user_contacts c
                ON c.user_id = u.id
            LEFT JOIN kyc_records k
                ON k.user_id = u.id
            WHERE u.status = 'kyc_pending'
            ORDER BY u.id DESC
        """)
    )

    users = result.mappings().all()

    return render_template(
        "admin/index.html",
        users=users
    )


# =========================================================
# APPROVE KYC
# =========================================================

@admin_bp.route("/approve/<int:user_id>", methods=["POST"])
def approve(user_id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("admin.login"))

    try:

        db.session.execute(
            text("""
                UPDATE users
                SET status = 'verified'
                WHERE id = :user_id
            """),
            {
                "user_id": user_id
            }
        )

        db.session.execute(
            text("""
                UPDATE kyc_records
                SET verification_status = 'verified'
                WHERE user_id = :user_id
            """),
            {
                "user_id": user_id
            }
        )

        db.session.commit()

        flash("KYC approved successfully.")

    except Exception as error:

        db.session.rollback()

        print("ADMIN APPROVE ERROR:", error)

        flash("Failed to approve KYC.")

    return redirect(url_for("admin.dashboard"))


# =========================================================
# REJECT KYC
# =========================================================

@admin_bp.route("/reject/<int:user_id>", methods=["POST"])
def reject(user_id):

    if not session.get("admin_logged_in"):
        return redirect(url_for("admin.login"))

    try:

        db.session.execute(
            text("""
                UPDATE users
                SET status = 'rejected'
                WHERE id = :user_id
            """),
            {
                "user_id": user_id
            }
        )

        db.session.execute(
            text("""
                UPDATE kyc_records
                SET verification_status = 'rejected'
                WHERE user_id = :user_id
            """),
            {
                "user_id": user_id
            }
        )

        db.session.commit()

        flash("KYC rejected.")

    except Exception as error:

        db.session.rollback()

        print("ADMIN REJECT ERROR:", error)

        flash("Failed to reject KYC.")

    return redirect(url_for("admin.dashboard"))


# =========================================================
# ADMIN LOGOUT
# =========================================================

@admin_bp.route("/logout")
def logout():

    session.pop("admin_logged_in", None)
    session.pop("admin_username", None)

    return redirect(url_for("admin.login"))
