# =========================================================
# ONE INDIA — GLOBAL REMITTANCE
# FLASK APPLICATION
# =========================================================

from flask import (
    Flask,
    jsonify,
    request,
    send_from_directory,
    redirect
)

from config import Config
from database import db

from routes.auth import auth_bp
from routes.customer import customer_bp
from routes.send_money import send_money_bp

from services.currency_service import get_exchange_rates


# =========================================================
# FLASK APPLICATION
# =========================================================

app = Flask(__name__)


# =========================================================
# APPLICATION CONFIGURATION
# =========================================================

app.config.from_object(Config)


# =========================================================
# DATABASE INITIALIZATION
# =========================================================

db.init_app(app)


# =========================================================
# BLUEPRINTS
# =========================================================

app.register_blueprint(auth_bp)
app.register_blueprint(customer_bp)
app.register_blueprint(send_money_bp)


# =========================================================
# HOME / LANDING PAGE
# =========================================================
#
# The main landing page is:
#
# frontend/index.html
#
# It is served through Flask on port 5000.
#
# URL:
# http://127.0.0.1:5000/
#
# =========================================================

@app.route("/")
def home():
    return send_from_directory(
        "frontend",
        "index.html"
    )


# =========================================================
# AUTHENTICATION PAGES
# =========================================================

@app.route("/register")
def register_page():
    return send_from_directory(
        "frontend",
        "register.html"
    )


@app.route("/login")
def login_page():
    return send_from_directory(
        "frontend",
        "login.html"
    )


# =========================================================
# DASHBOARD REDIRECT
# =========================================================
#
# The actual customer dashboard is handled by:
#
# routes/customer.py
#
# URL:
# /customer/
#
# This route exists so that login.html can continue
# redirecting to /dashboard.
#
# =========================================================

@app.route("/dashboard")
def dashboard():
    return redirect("/customer/")


# =========================================================
# DATABASE CONNECTION TEST
# =========================================================

@app.route("/api/test-db")
def test_db():

    try:

        from sqlalchemy import text

        result = db.session.execute(
            text("SELECT 1")
        )

        result.scalar()

        return jsonify({
            "success": True,
            "message": "MySQL database connection successful."
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": "Database connection failed.",
            "error": str(error)
        }), 500


# =========================================================
# LIVE EXCHANGE RATE API
# =========================================================

@app.route("/api/rates")
def api_rates():

    base_currency = request.args.get(
        "base",
        "INR"
    ).upper()

    try:

        result = get_exchange_rates(
            base_currency
        )

        status_code = (
            200
            if result.get("success")
            else 500
        )

        return jsonify(
            result
        ), status_code

    except Exception as error:

        return jsonify({
            "success": False,
            "base": base_currency,
            "rates": {},
            "error": str(error)
        }), 500


# =========================================================
# ERROR HANDLERS
# =========================================================

@app.errorhandler(404)
def page_not_found(error):

    return jsonify({
        "success": False,
        "error": "Page not found",
        "path": request.path
    }), 404


@app.errorhandler(500)
def internal_server_error(error):

    return jsonify({
        "success": False,
        "error": "Internal server error",
        "details": str(error)
    }), 500


# =========================================================
# APPLICATION START
# =========================================================

if __name__ == "__main__":

    print("")

    print("=" * 60)
    print("ONE INDIA — GLOBAL REMITTANCE")
    print("=" * 60)

    print(
        "Home             : "
        "http://127.0.0.1:5000/"
    )

    print(
        "Login            : "
        "http://127.0.0.1:5000/login"
    )

    print(
        "Register         : "
        "http://127.0.0.1:5000/register"
    )

    print(
        "Dashboard        : "
        "http://127.0.0.1:5000/dashboard"
    )

    print(
        "Customer Portal  : "
        "http://127.0.0.1:5000/customer/"
    )

    print(
        "Live Rates API   : "
        "http://127.0.0.1:5000/api/rates?base=INR"
    )

    print(
        "Database Test    : "
        "http://127.0.0.1:5000/api/test-db"
    )

    print("=" * 60)

    print("")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )