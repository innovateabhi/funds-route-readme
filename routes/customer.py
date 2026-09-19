from flask import (
    Blueprint,
    render_template,
    session,
    redirect,
    url_for
)

from sqlalchemy import text

from database import db
from services.currency_service import get_exchange_rates
from utils.auth import login_required


customer_bp = Blueprint(
    "customer",
    __name__,
    url_prefix="/customer"
)

# SEND MONEY ROUTE
@customer_bp.route("/send-money")
@login_required
def send_money():
    return render_template(
        "customer/send-money.html"
    )

# SETTINGS ROUTE
@customer_bp.route("/settings")
@login_required
def settings():

    user_id = session["user_id"]

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                p.full_name,
                p.nationality,
                c.email,
                c.phone
            FROM users u

            LEFT JOIN user_profiles p
                ON p.user_id = u.id

            LEFT JOIN user_contacts c
                ON c.user_id = u.id

            WHERE u.id = :user_id
        """),
        {
            "user_id": user_id
        }
    )

    user = result.mappings().first()

    if not user:
        session.clear()
        return redirect(url_for("login_page"))

    # ---------------------------------
    # CUSTOMER INFORMATION
    # ---------------------------------

    full_name = user["full_name"] or user["username"]
    first_name = full_name.split()[0]

    customer = {
        "id": user["id"],
        "username": user["username"],
        "name": full_name,
        "first_name": first_name,
        "email": user["email"],
        "phone": user["phone"],
        "country": user["nationality"],
        "currency": "INR",
        "verified": user["status"] == "verified",
    }

    return render_template(
        "customer/settings.html",
        customer=customer
    )

# EXCHANGE RATES ROUTES
@customer_bp.route("/exchange-rates")
@login_required
def exchange_rates():

    user_id = session["user_id"]

    # ---------------------------------------------------------
    # GET CUSTOMER INFORMATION
    # ---------------------------------------------------------

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                p.full_name,
                p.nationality,
                c.email,
                c.phone
            FROM users u
            LEFT JOIN user_profiles p
                ON p.user_id = u.id
            LEFT JOIN user_contacts c
                ON c.user_id = u.id
            WHERE u.id = :user_id
        """),
        {
            "user_id": user_id
        }
    )

    user = result.mappings().first()

    if not user:
        session.clear()
        return redirect(url_for("login_page"))

    full_name = user["full_name"] or user["username"]
    first_name = full_name.split()[0]

    customer = {
        "id": user["id"],
        "username": user["username"],
        "name": full_name,
        "first_name": first_name,
        "email": user["email"],
        "phone": user["phone"],
        "country": user["nationality"],
        "currency": "INR",
        "verified": user["status"] == "verified",
    }

    # ---------------------------------------------------------
    # GET LIVE INR RATES
    # ---------------------------------------------------------

    inr_response = get_exchange_rates("INR")

    rates = []

    if inr_response.get("success"):

        inr_rates = inr_response.get("rates", {})

        # INR → NPR
        if inr_rates.get("NPR") is not None:

            rates.append({
                "from_currency": "INR",
                "from_country": "India",
                "from_flag": "🇮🇳",

                "to_currency": "NPR",
                "to_country": "Nepal",
                "to_flag": "🇳🇵",

                "rate": inr_rates["NPR"]
            })

        # INR → USD
        if inr_rates.get("USD") is not None:

            rates.append({
                "from_currency": "INR",
                "from_country": "India",
                "from_flag": "🇮🇳",

                "to_currency": "USD",
                "to_country": "United States",
                "to_flag": "🇺🇸",

                "rate": inr_rates["USD"]
            })

        # INR → EUR
        if inr_rates.get("EUR") is not None:

            rates.append({
                "from_currency": "INR",
                "from_country": "India",
                "from_flag": "🇮🇳",

                "to_currency": "EUR",
                "to_country": "European Union",
                "to_flag": "🇪🇺",

                "rate": inr_rates["EUR"]
            })

        # INR → GBP
        if inr_rates.get("GBP") is not None:

            rates.append({
                "from_currency": "INR",
                "from_country": "India",
                "from_flag": "🇮🇳",

                "to_currency": "GBP",
                "to_country": "United Kingdom",
                "to_flag": "🇬🇧",

                "rate": inr_rates["GBP"]
            })

    # ---------------------------------------------------------
    # GET LIVE NPR → INR RATE
    # ---------------------------------------------------------

    npr_response = get_exchange_rates("NPR")

    if npr_response.get("success"):

        npr_rates = npr_response.get("rates", {})

        if npr_rates.get("INR") is not None:

            rates.append({
                "from_currency": "NPR",
                "from_country": "Nepal",
                "from_flag": "🇳🇵",

                "to_currency": "INR",
                "to_country": "India",
                "to_flag": "🇮🇳",

                "rate": npr_rates["INR"]
            })

    return render_template(
        "customer/exchange-rates.html",
        customer=customer,
        rates=rates
    )


# NOTIFICATIONS ROUTE

@customer_bp.route("/notifications")
@login_required
def notifications():

    user_id = session["user_id"]

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                p.full_name,
                p.nationality,
                c.email,
                c.phone
            FROM users u
            LEFT JOIN user_profiles p
                ON p.user_id = u.id
            LEFT JOIN user_contacts c
                ON c.user_id = u.id
            WHERE u.id = :user_id
        """),
        {
            "user_id": user_id
        }
    )

    user = result.mappings().first()

    if not user:
        session.clear()
        return redirect(url_for("login_page"))

    full_name = user["full_name"] or user["username"]
    first_name = full_name.split()[0]

    customer = {
        "id": user["id"],
        "username": user["username"],
        "name": full_name,
        "first_name": first_name,
        "email": user["email"],
        "phone": user["phone"],
        "country": user["nationality"],
        "currency": "INR",
        "verified": user["status"] == "verified",
    }

    notifications = [
        {
            "id": 1,
            "type": "transaction",
            "title": "Transfer completed",
            "message": "Your transfer to Rajesh Sharma has been completed successfully.",
            "time": "2 hours ago",
            "read": False,
        },
        {
            "id": 2,
            "type": "security",
            "title": "Login successful",
            "message": "A successful login to your FundsRoute account was detected.",
            "time": "Yesterday",
            "read": True,
        },
        {
            "id": 3,
            "type": "rate",
            "title": "Exchange rate updated",
            "message": "The latest INR → NPR exchange rate is now available.",
            "time": "2 days ago",
            "read": True,
        },
        {
            "id": 4,
            "type": "account",
            "title": "Account verified",
            "message": "Your FundsRoute account has been successfully verified.",
            "time": "5 days ago",
            "read": True,
        },
    ]

    unread_count = sum(
        1 for notification in notifications
        if not notification["read"]
    )

    return render_template(
        "customer/notifications.html",
        customer=customer,
        notifications=notifications,
        unread_count=unread_count
    )

# TRANSACTIONS ROUTE
@customer_bp.route("/transactions")
@login_required
def transactions():

    user_id = session["user_id"]

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                p.full_name,
                p.nationality,
                c.email,
                c.phone
            FROM users u
            LEFT JOIN user_profiles p
                ON p.user_id = u.id
            LEFT JOIN user_contacts c
                ON c.user_id = u.id
            WHERE u.id = :user_id
        """),
        {
            "user_id": user_id
        }
    )

    user = result.mappings().first()

    if not user:
        session.clear()
        return redirect(url_for("login_page"))

    full_name = user["full_name"] or user["username"]
    first_name = full_name.split()[0]

    customer = {
        "id": user["id"],
        "username": user["username"],
        "name": full_name,
        "first_name": first_name,
        "email": user["email"],
        "phone": user["phone"],
        "country": user["nationality"],
        "currency": "INR",
        "verified": user["status"] == "verified",
    }

    transactions = [
        {
            "reference": "OIGR-20260914-001",
            "recipient": "Rajesh Sharma",
            "country": "Nepal",
            "flag": "🇳🇵",
            "direction": "India → Nepal",
            "source_currency": "INR",
            "destination_currency": "NPR",
            "source_amount": "10,000.00",
            "destination_amount": "16,000.00",
            "exchange_rate": "1.6000",
            "fee": "50.00",
            "status": "completed",
            "date": "14 Sep 2026",
            "time": "14:32",
        },
        {
            "reference": "OIGR-20260913-002",
            "recipient": "Amit Roy",
            "country": "India",
            "flag": "🇮🇳",
            "direction": "Nepal → India",
            "source_currency": "NPR",
            "destination_currency": "INR",
            "source_amount": "8,000.00",
            "destination_amount": "5,000.00",
            "exchange_rate": "0.6250",
            "fee": "40.00",
            "status": "processing",
            "date": "13 Sep 2026",
            "time": "10:15",
        },
        {
            "reference": "OIGR-20260910-003",
            "recipient": "Rajesh Sharma",
            "country": "Nepal",
            "flag": "🇳🇵",
            "direction": "India → Nepal",
            "source_currency": "INR",
            "destination_currency": "NPR",
            "source_amount": "5,000.00",
            "destination_amount": "8,000.00",
            "exchange_rate": "1.6000",
            "fee": "35.00",
            "status": "completed",
            "date": "10 Sep 2026",
            "time": "17:48",
        },
        {
            "reference": "OIGR-20260907-004",
            "recipient": "Amit Roy",
            "country": "India",
            "flag": "🇮🇳",
            "direction": "Nepal → India",
            "source_currency": "NPR",
            "destination_currency": "INR",
            "source_amount": "12,000.00",
            "destination_amount": "7,500.00",
            "exchange_rate": "0.6250",
            "fee": "45.00",
            "status": "failed",
            "date": "07 Sep 2026",
            "time": "09:21",
        },
    ]

    return render_template(
        "customer/transactions.html",
        customer=customer,
        transactions=transactions
    )


# BENEFICIARIES ROUTE
@customer_bp.route("/beneficiaries")
@login_required
def beneficiaries():

    user_id = session["user_id"]

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                p.full_name,
                p.nationality,
                c.email,
                c.phone
            FROM users u
            LEFT JOIN user_profiles p
                ON p.user_id = u.id
            LEFT JOIN user_contacts c
                ON c.user_id = u.id
            WHERE u.id = :user_id
        """),
        {"user_id": user_id}
    )

    user = result.mappings().first()

    if not user:
        session.clear()
        return redirect(url_for("login_page"))

    full_name = user["full_name"] or user["username"]
    first_name = full_name.split()[0]

    customer = {
        "id": user["id"],
        "username": user["username"],
        "name": full_name,
        "first_name": first_name,
        "email": user["email"],
        "phone": user["phone"],
        "country": user["nationality"],
        "currency": "INR",
        "verified": user["status"] == "verified",
    }

    # Prototype beneficiaries
    beneficiaries = [
        {
            "id": 1,
            "name": "Rajesh Sharma",
            "country": "Nepal",
            "flag": "🇳🇵",
            "currency": "NPR",
            "bank": "Nepal Bank Limited",
            "account": "•••• 4821",
            "relationship": "Friend",
        },
        {
            "id": 2,
            "name": "Amit Roy",
            "country": "India",
            "flag": "🇮🇳",
            "currency": "INR",
            "bank": "State Bank of India",
            "account": "•••• 7294",
            "relationship": "Family",
        },
        {
            "id": 3,
            "name": "Priya Sharma",
            "country": "Nepal",
            "flag": "🇳🇵",
            "currency": "NPR",
            "bank": "Himalayan Bank",
            "account": "•••• 3156",
            "relationship": "Family",
        },
    ]

    return render_template(
        "customer/beneficiaries.html",
        customer=customer,
        beneficiaries=beneficiaries
    )




# =========================================================
# CUSTOMER DASHBOARD
# =========================================================

@customer_bp.route("/")
@login_required
def dashboard():

    # ---------------------------------------------------------
    # GET LOGGED-IN USER ID FROM SESSION
    # ---------------------------------------------------------

    user_id = session["user_id"]


    # ---------------------------------------------------------
    # FETCH CUSTOMER DATA FROM DATABASE
    # ---------------------------------------------------------

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                p.full_name,
                p.nationality,
                c.email,
                c.phone
            FROM users u

            LEFT JOIN user_profiles p
                ON p.user_id = u.id

            LEFT JOIN user_contacts c
                ON c.user_id = u.id

            WHERE u.id = :user_id
        """),
        {
            "user_id": user_id
        }
    )

    user = result.mappings().first()


    # ---------------------------------------------------------
    # SAFETY CHECK
    # ---------------------------------------------------------

    if not user:

        session.clear()

        return render_template(
            "customer/dashboard.html",
            customer=None,
            stats={},
            transactions=[],
            beneficiaries=[],
            exchange_rates=[],
            inr_to_npr=None,
            npr_to_inr=None
        )


    # ---------------------------------------------------------
    # CUSTOMER DATA
    # ---------------------------------------------------------

    full_name = user["full_name"] or user["username"]

    first_name = full_name.split()[0]


    customer = {

        "id": user["id"],

        "username": user["username"],

        "name": full_name,

        "first_name": first_name,

        "email": user["email"],

        "phone": user["phone"],

        "country": user["nationality"],

        "currency": "INR",

        "verified": user["status"] == "verified",

    }


    # ---------------------------------------------------------
    # TEMPORARY DEMO DATA
    # ---------------------------------------------------------
    # These will later be replaced with real database queries.
    # ---------------------------------------------------------

    stats = {

        "total_sent": 25000,

        "total_received": 40000,

        "this_month": 10000,

        "transfers": 4,

        "beneficiaries": 2,

    }


    beneficiaries = [

        {
            "id": 1,

            "name": "Rajesh Sharma",

            "country": "Nepal",

            "currency": "NPR",

            "flag": "🇳🇵",

            "direction": "INR → NPR",
        },

        {
            "id": 2,

            "name": "Amit Roy",

            "country": "India",

            "currency": "INR",

            "flag": "🇮🇳",

            "direction": "NPR → INR",
        },

    ]


    # ---------------------------------------------------------
    # LIVE EXCHANGE RATES
    # ---------------------------------------------------------

    inr_response = get_exchange_rates("INR")

    inr_to_npr = None


    if inr_response.get("success"):

        inr_to_npr = (
            inr_response
            .get("rates", {})
            .get("NPR")
        )


    npr_response = get_exchange_rates("NPR")

    npr_to_inr = None


    if npr_response.get("success"):

        npr_to_inr = (
            npr_response
            .get("rates", {})
            .get("INR")
        )


    exchange_rates = []


    if inr_to_npr is not None:

        exchange_rates.append({

            "from_currency": "INR",

            "from_country": "India",

            "from_flag": "🇮🇳",

            "to_currency": "NPR",

            "to_country": "Nepal",

            "to_flag": "🇳🇵",

            "rate": inr_to_npr,

            "direction": "India → Nepal",

        })


    if npr_to_inr is not None:

        exchange_rates.append({

            "from_currency": "NPR",

            "from_country": "Nepal",

            "from_flag": "🇳🇵",

            "to_currency": "INR",

            "to_country": "India",

            "to_flag": "🇮🇳",

            "rate": npr_to_inr,

            "direction": "Nepal → India",

        })


    # ---------------------------------------------------------
    # TEMPORARY TRANSACTION DATA
    # ---------------------------------------------------------
    # This will later come from remittance_transactions.
    # ---------------------------------------------------------

    transactions = [

        {
            "id": "OIGR-20260914-001",

            "beneficiary": "Rajesh Sharma",

            "country": "Nepal",

            "country_flag": "🇳🇵",

            "amount_sent": 10000,

            "amount_received": 16000,

            "send_currency": "INR",

            "receive_currency": "NPR",

            "direction": "India → Nepal",

            "date": "14 Sep 2026",

            "status": "Completed",

        },

        {
            "id": "OIGR-20260913-002",

            "beneficiary": "Amit Roy",

            "country": "India",

            "country_flag": "🇮🇳",

            "amount_sent": 8000,

            "amount_received": 5000,

            "send_currency": "NPR",

            "receive_currency": "INR",

            "direction": "Nepal → India",

            "date": "13 Sep 2026",

            "status": "Completed",

        },

    ]


    # ---------------------------------------------------------
    # RENDER DASHBOARD
    # ---------------------------------------------------------

    return render_template(

        "customer/dashboard.html",

        customer=customer,

        stats=stats,

        transactions=transactions,

        beneficiaries=beneficiaries,

        exchange_rates=exchange_rates,

        inr_to_npr=inr_to_npr,

        npr_to_inr=npr_to_inr,

    )


@customer_bp.route("/profile")
@login_required
def profile():
    user_id = session["user_id"]

    result = db.session.execute(
        text("""
            SELECT
                u.id,
                u.username,
                u.status,
                u.created_at,

                p.full_name,
                p.date_of_birth,
                p.gender,
                p.nationality,
                p.occupation,

                c.email,
                c.phone,
                c.email_verified,
                c.phone_verified,

                a.address_line,
                a.city,
                a.state,
                a.country,
                a.postal_code,

                k.document_type,
                k.document_number,
                k.verification_status AS kyc_status,
                k.verified_at,

                b.account_holder_name,
                b.bank_name,
                b.account_number,
                b.ifsc_code,
                b.account_type,
                b.verification_status AS bank_status

            FROM users u

            LEFT JOIN user_profiles p
                ON p.user_id = u.id

            LEFT JOIN user_contacts c
                ON c.user_id = u.id

            LEFT JOIN user_addresses a
                ON a.user_id = u.id

            LEFT JOIN kyc_records k
                ON k.user_id = u.id

            LEFT JOIN bank_accounts b
                ON b.user_id = u.id

            WHERE u.id = :user_id
        """),
        {
            "user_id": user_id
        }
    )

    user = result.mappings().first()

    if not user:
        session.clear()
        return redirect(url_for("login_page"))

    # -----------------------------
    # CUSTOMER HEADER DATA
    # -----------------------------

    full_name = user["full_name"] or user["username"]
    first_name = full_name.split()[0]

    customer = {
        "id": user["id"],
        "username": user["username"],
        "name": full_name,
        "first_name": first_name,
        "email": user["email"],
        "phone": user["phone"],
        "country": user["nationality"],
        "currency": "INR",
        "verified": user["status"] == "verified",
    }

    # -----------------------------
    # PROFILE PAGE
    # -----------------------------

    return render_template(
        "customer/profile.html",
        customer=customer,
        user=user
    )