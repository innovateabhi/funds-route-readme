from flask import (
    Blueprint,
    jsonify,
    request,
    session,
    redirect,
    url_for
)

from database import db

from sqlalchemy import text

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from datetime import datetime
from pathlib import Path
import uuid


# =========================================================
# AUTHENTICATION BLUEPRINT
# =========================================================

auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


# =========================================================
# FILE UPLOAD CONFIGURATION
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOAD_DIR = BASE_DIR / "uploads" / "kyc"

DOCUMENT_UPLOAD_DIR = UPLOAD_DIR / "documents"
SELFIE_UPLOAD_DIR = UPLOAD_DIR / "selfies"


DOCUMENT_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)

SELFIE_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)


# =========================================================
# ALLOWED FILE TYPES
# =========================================================

ALLOWED_DOCUMENT_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".pdf"
}

ALLOWED_SELFIE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
}


MAX_DOCUMENT_SIZE = 10 * 1024 * 1024
MAX_SELFIE_SIZE = 10 * 1024 * 1024


# =========================================================
# HELPER FUNCTIONS
# =========================================================

def get_clean_form_value(field_name):
    """
    Get a normal text field from request.form
    and remove unnecessary whitespace.
    """

    return request.form.get(
        field_name,
        ""
    ).strip()


def get_file_extension(filename):
    """
    Return the lowercase extension of a file.
    """

    return Path(
        filename
    ).suffix.lower()


def save_uploaded_file(
    uploaded_file,
    destination_directory,
    allowed_extensions,
    max_size
):
    """
    Safely save an uploaded file.

    Returns:
        Relative file path.
    """

    if not uploaded_file:
        raise ValueError(
            "Uploaded file is missing."
        )

    if not uploaded_file.filename:
        raise ValueError(
            "Uploaded file has no filename."
        )

    extension = get_file_extension(
        uploaded_file.filename
    )

    if extension not in allowed_extensions:
        raise ValueError(
            f"Unsupported file type: {extension}"
        )

    # -----------------------------------------------------
    # Check file size
    # -----------------------------------------------------

    uploaded_file.stream.seek(0)

    file_data = uploaded_file.stream.read()

    if len(file_data) > max_size:
        raise ValueError(
            "Uploaded file is too large."
        )

    if len(file_data) == 0:
        raise ValueError(
            "Uploaded file is empty."
        )

    # Reset stream
    uploaded_file.stream.seek(0)

    # -----------------------------------------------------
    # Generate unique filename
    # -----------------------------------------------------

    unique_name = (
        f"{uuid.uuid4().hex}"
        f"{extension}"
    )

    destination_path = (
        destination_directory /
        unique_name
    )

    uploaded_file.save(
        destination_path
    )

    # -----------------------------------------------------
    # Return path relative to project
    # -----------------------------------------------------

    relative_path = destination_path.relative_to(
        BASE_DIR
    )

    return str(
        relative_path
    ).replace("\\", "/")


# =========================================================
# REGISTRATION
# =========================================================

@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    document_path = None
    selfie_path = None

    try:

        # =================================================
        # RECEIVE FORM DATA
        # =================================================

        full_name = get_clean_form_value(
            "fullName"
        )

        date_of_birth = get_clean_form_value(
            "dateOfBirth"
        )

        gender = get_clean_form_value(
            "gender"
        )

        nationality = get_clean_form_value(
            "nationality"
        )

        occupation = get_clean_form_value(
            "occupation"
        )

        email = get_clean_form_value(
            "email"
        ).lower()

        phone = get_clean_form_value(
            "phone"
        )

        address_line = get_clean_form_value(
            "addressLine"
        )

        city = get_clean_form_value(
            "city"
        )

        state = get_clean_form_value(
            "state"
        )

        country = get_clean_form_value(
            "country"
        )

        postal_code = get_clean_form_value(
            "postalCode"
        )

        document_type = get_clean_form_value(
            "documentType"
        )

        document_number = get_clean_form_value(
            "documentNumber"
        )

        account_holder_name = get_clean_form_value(
            "accountHolderName"
        )

        bank_name = get_clean_form_value(
            "bankName"
        )

        account_type = get_clean_form_value(
            "accountType"
        )

        account_number = get_clean_form_value(
            "accountNumber"
        )

        ifsc_code = get_clean_form_value(
            "ifscCode"
        ).upper()

        username = get_clean_form_value(
            "username"
        )

        password = request.form.get(
            "password",
            ""
        )

        confirm_password = request.form.get(
            "confirmPassword",
            ""
        )


        # =================================================
        # RECEIVE FILES
        # =================================================

        document_file = request.files.get(
            "documentFile"
        )

        selfie_file = request.files.get(
            "selfieFile"
        )


        # =================================================
        # REQUIRED FIELD VALIDATION
        # =================================================

        required_fields = {

            "fullName":
                full_name,

            "dateOfBirth":
                date_of_birth,

            "gender":
                gender,

            "nationality":
                nationality,

            "email":
                email,

            "phone":
                phone,

            "addressLine":
                address_line,

            "city":
                city,

            "state":
                state,

            "country":
                country,

            "postalCode":
                postal_code,

            "documentType":
                document_type,

            "documentNumber":
                document_number,

            "accountHolderName":
                account_holder_name,

            "bankName":
                bank_name,

            "accountType":
                account_type,

            "accountNumber":
                account_number,

            "ifscCode":
                ifsc_code,

            "username":
                username,

            "password":
                password
        }


        missing_fields = [
            field
            for field, value
            in required_fields.items()
            if not value
        ]


        if missing_fields:

            return jsonify({

                "success": False,

                "message":
                    "Required fields are missing.",

                "missing_fields":
                    missing_fields

            }), 400


        # =================================================
        # PASSWORD VALIDATION
        # =================================================

        if password != confirm_password:

            return jsonify({

                "success": False,

                "message":
                    "Passwords do not match."

            }), 400


        if len(password) < 8:

            return jsonify({

                "success": False,

                "message":
                    "Password must contain at least 8 characters."

            }), 400


        # =================================================
        # USERNAME VALIDATION
        # =================================================

        if not (
            3 <= len(username) <= 30
        ):

            return jsonify({

                "success": False,

                "message":
                    "Username must be between 3 and 30 characters."

            }), 400


        # =================================================
        # EMAIL BASIC VALIDATION
        # =================================================

        if (
            "@" not in email or
            "." not in email
        ):

            return jsonify({

                "success": False,

                "message":
                    "Please provide a valid email address."

            }), 400


        # =================================================
        # DATE VALIDATION
        # =================================================

        try:

            parsed_date_of_birth = datetime.strptime(
                date_of_birth,
                "%Y-%m-%d"
            ).date()

        except ValueError:

            return jsonify({

                "success": False,

                "message":
                    "Invalid date of birth."

            }), 400


        # =================================================
        # ENUM VALIDATION
        # =================================================

        allowed_genders = {
            "male",
            "female",
            "other",
            "prefer_not_to_say"
        }

        if gender not in allowed_genders:

            return jsonify({

                "success": False,

                "message":
                    "Invalid gender selection."

            }), 400


        allowed_document_types = {
            "aadhaar",
            "passport",
            "driving_license",
            "voter_id",
            "other"
        }

        if document_type not in allowed_document_types:

            return jsonify({

                "success": False,

                "message":
                    "Invalid KYC document type."

            }), 400


        allowed_account_types = {
            "savings",
            "current"
        }

        if account_type not in allowed_account_types:

            return jsonify({

                "success": False,

                "message":
                    "Invalid bank account type."

            }), 400


        # =================================================
        # KYC FILE VALIDATION
        # =================================================

        if not document_file:

            return jsonify({

                "success": False,

                "message":
                    "KYC document is required."

            }), 400


        if not selfie_file:

            return jsonify({

                "success": False,

                "message":
                    "Selfie is required."

            }), 400


        # =================================================
        # DATABASE DUPLICATE CHECKS
        # =================================================

        # -------------------------------------------------
        # Username
        # -------------------------------------------------

        username_check = db.session.execute(

            text("""
                SELECT id
                FROM users
                WHERE username = :username
                LIMIT 1
            """),

            {
                "username": username
            }

        ).first()


        if username_check:

            return jsonify({

                "success": False,

                "message":
                    "Username already exists."

            }), 409


        # -------------------------------------------------
        # Email
        # -------------------------------------------------

        email_check = db.session.execute(

            text("""
                SELECT id
                FROM user_contacts
                WHERE email = :email
                LIMIT 1
            """),

            {
                "email": email
            }

        ).first()


        if email_check:

            return jsonify({

                "success": False,

                "message":
                    "Email address is already registered."

            }), 409


        # -------------------------------------------------
        # Phone
        # -------------------------------------------------

        phone_check = db.session.execute(

            text("""
                SELECT id
                FROM user_contacts
                WHERE phone = :phone
                LIMIT 1
            """),

            {
                "phone": phone
            }

        ).first()


        if phone_check:

            return jsonify({

                "success": False,

                "message":
                    "Phone number is already registered."

            }), 409


        # =================================================
        # SAVE UPLOADED FILES
        # =================================================

        document_path = save_uploaded_file(

            document_file,

            DOCUMENT_UPLOAD_DIR,

            ALLOWED_DOCUMENT_EXTENSIONS,

            MAX_DOCUMENT_SIZE

        )


        selfie_path = save_uploaded_file(

            selfie_file,

            SELFIE_UPLOAD_DIR,

            ALLOWED_SELFIE_EXTENSIONS,

            MAX_SELFIE_SIZE

        )


        # =================================================
        # PASSWORD HASH
        # =================================================

        password_hash = generate_password_hash(
            password
        )


        # =================================================
        # CREATE USER
        # =================================================

        user_result = db.session.execute(

            text("""
                INSERT INTO users (
                    username,
                    password_hash,
                    status
                )
                VALUES (
                    :username,
                    :password_hash,
                    'kyc_pending'
                )
                RETURNING id
            """),

            {
                "username":
                    username,

                "password_hash":
                    password_hash
            }

        )


        # =================================================
        # GET POSTGRESQL GENERATED USER ID
        # =================================================

        user_id = user_result.scalar_one()


        # =================================================
        # CREATE USER PROFILE
        # =================================================

        db.session.execute(

            text("""
                INSERT INTO user_profiles (
                    user_id,
                    full_name,
                    date_of_birth,
                    gender,
                    nationality,
                    occupation
                )
                VALUES (
                    :user_id,
                    :full_name,
                    :date_of_birth,
                    :gender,
                    :nationality,
                    :occupation
                )
            """),

            {
                "user_id":
                    user_id,

                "full_name":
                    full_name,

                "date_of_birth":
                    parsed_date_of_birth,

                "gender":
                    gender,

                "nationality":
                    nationality,

                "occupation":
                    occupation or None
            }

        )


        # =================================================
        # CREATE USER CONTACT
        # =================================================

        db.session.execute(

            text("""
                INSERT INTO user_contacts (
                    user_id,
                    email,
                    phone,
                    email_verified,
                    phone_verified
                )
                VALUES (
                    :user_id,
                    :email,
                    :phone,
                    FALSE,
                    FALSE
                )
            """),

            {
                "user_id":
                    user_id,

                "email":
                    email,

                "phone":
                    phone
            }

        )


        # =================================================
        # CREATE USER ADDRESS
        # =================================================

        db.session.execute(

            text("""
                INSERT INTO user_addresses (
                    user_id,
                    address_line,
                    city,
                    state,
                    country,
                    postal_code
                )
                VALUES (
                    :user_id,
                    :address_line,
                    :city,
                    :state,
                    :country,
                    :postal_code
                )
            """),

            {
                "user_id":
                    user_id,

                "address_line":
                    address_line,

                "city":
                    city,

                "state":
                    state,

                "country":
                    country,

                "postal_code":
                    postal_code
            }

        )


        # =================================================
        # CREATE KYC RECORD
        # =================================================

        db.session.execute(

            text("""
                INSERT INTO kyc_records (
                    user_id,
                    document_type,
                    document_number,
                    document_file,
                    selfie_file,
                    verification_status,
                    submitted_at
                )
                VALUES (
                    :user_id,
                    :document_type,
                    :document_number,
                    :document_file,
                    :selfie_file,
                    'pending',
                    CURRENT_TIMESTAMP
                )
            """),

            {
                "user_id":
                    user_id,

                "document_type":
                    document_type,

                "document_number":
                    document_number,

                "document_file":
                    document_path,

                "selfie_file":
                    selfie_path
            }

        )


        # =================================================
        # CREATE BANK ACCOUNT
        # =================================================

        db.session.execute(

            text("""
                INSERT INTO bank_accounts (
                    user_id,
                    account_holder_name,
                    bank_name,
                    account_number,
                    ifsc_code,
                    account_type,
                    verification_status
                )
                VALUES (
                    :user_id,
                    :account_holder_name,
                    :bank_name,
                    :account_number,
                    :ifsc_code,
                    :account_type,
                    'pending'
                )
            """),

            {
                "user_id":
                    user_id,

                "account_holder_name":
                    account_holder_name,

                "bank_name":
                    bank_name,

                "account_number":
                    account_number,

                "ifsc_code":
                    ifsc_code,

                "account_type":
                    account_type
            }

        )


        # =================================================
        # COMMIT EVERYTHING
        # =================================================

        db.session.commit()


        # =================================================
        # SUCCESS RESPONSE
        # =================================================

        return jsonify({

            "success": True,

            "message":
                "Registration submitted successfully. Your account is now under KYC verification.",

            "user_id":
                user_id,

            "username":
                username,

            "status":
                "kyc_pending"

        }), 201


    # =====================================================
    # REGISTRATION ERROR
    # =====================================================

    except Exception as error:

        db.session.rollback()


        # -------------------------------------------------
        # Delete uploaded files if database operation
        # failed after files were created.
        # -------------------------------------------------

        try:

            if document_path:

                document_full_path = (
                    BASE_DIR /
                    document_path
                )

                if document_full_path.exists():
                    document_full_path.unlink()


            if selfie_path:

                selfie_full_path = (
                    BASE_DIR /
                    selfie_path
                )

                if selfie_full_path.exists():
                    selfie_full_path.unlink()

        except Exception:
            pass


        print(
            "REGISTRATION ERROR:",
            error
        )


        return jsonify({

            "success": False,

            "message":
                "Registration failed. No account was created.",

            "error":
                str(error)

        }), 500


# =========================================================
# LOGOUT
# =========================================================

@auth_bp.route("/logout")
def logout():

    # Remove all session data
    session.clear()

    # Send customer back to login page
    return redirect(url_for("login_page"))


# =========================================================
# LOGIN
# =========================================================

@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    try:

        # =================================================
        # RECEIVE LOGIN DATA
        # =================================================

        username = request.form.get(
            "username",
            ""
        ).strip()

        password = request.form.get(
            "password",
            ""
        )


        # =================================================
        # DEBUG INFORMATION
        # =================================================
        # Safe debugging:
        # We never print the actual password.

        print(
            "LOGIN USERNAME:",
            repr(username)
        )

        print(
            "PASSWORD RECEIVED:",
            bool(password)
        )


        # =================================================
        # BASIC VALIDATION
        # =================================================

        if not username:

            return jsonify({

                "success": False,

                "message":
                    "Please enter your username."

            }), 400


        if not password:

            return jsonify({

                "success": False,

                "message":
                    "Please enter your password."

            }), 400


        # =================================================
        # FIND USER
        # =================================================

        result = db.session.execute(

            text("""
                SELECT
                    id,
                    username,
                    password_hash,
                    status
                FROM users
                WHERE username = :username
                LIMIT 1
            """),

            {
                "username":
                    username
            }

        )


        user = result.mappings().first()


        # =================================================
        # DEBUG USER RESULT
        # =================================================

        print(
            "USER FOUND:",
            user is not None
        )


        if user:

            print(
                "DB USERNAME:",
                user["username"]
            )

            print(
                "DB STATUS:",
                user["status"]
            )


        # =================================================
        # USER NOT FOUND
        # =================================================

        if not user:

            return jsonify({

                "success": False,

                "message":
                    "Invalid username or password."

            }), 401


        # =================================================
        # PASSWORD CHECK
        # =================================================

        password_correct = check_password_hash(

            user["password_hash"],

            password

        )


        print(
            "PASSWORD CORRECT:",
            password_correct
        )


        if not password_correct:

            return jsonify({

                "success": False,

                "message":
                    "Invalid username or password."

            }), 401


        # =================================================
        # ACCOUNT STATUS CHECK
        # =================================================

        if user["status"] != "verified":

            return jsonify({

                "success": False,

                "message":
                    "Your account has not been verified yet.",

                "status":
                    user["status"]

            }), 403


        # =================================================
        # CREATE LOGIN SESSION
        # =================================================

        session.permanent = True

        session["user_id"] = user["id"]

        session["username"] = user["username"]


        # =================================================
        # LOGIN SUCCESS
        # =================================================

        return jsonify({

            "success": True,

            "message":
                "Login successful.",

            "user": {

                "id":
                    user["id"],

                "username":
                    user["username"],

                "status":
                    user["status"]

            }

        }), 200


    # =====================================================
    # LOGIN ERROR
    # =====================================================

    except Exception as error:

        db.session.rollback()

        print(
            "LOGIN ERROR:",
            error
        )


        return jsonify({

            "success": False,

            "message":
                "Login failed because of a server error.",

            "error":
                str(error)

        }), 500
