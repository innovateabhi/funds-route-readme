from flask import Blueprint, render_template

from services.currency_service import get_exchange_rates


# =========================================================
# CUSTOMER BLUEPRINT
# =========================================================

customer_bp = Blueprint(
    "customer",
    __name__,
    url_prefix="/customer"
)


# =========================================================
# CUSTOMER DASHBOARD
# =========================================================

@customer_bp.route("/")
def dashboard():

    # =====================================================
    # CUSTOMER
    # =====================================================

    customer = {
        "id": 1,
        "name": "Abhinandan Roy",
        "first_name": "Abhinandan",
        "email": "customer@example.com",
        "phone": "+91 98765 43210",
        "country": "India",
        "currency": "INR",
        "verified": True,
    }


    # =====================================================
    # DASHBOARD STATS
    # =====================================================

    # Keep monetary values as numbers.
    # dashboard.html handles the currency formatting.

    stats = {
        "total_sent": 25000,
        "total_received": 40000,
        "this_month": 10000,
        "transfers": 4,
        "beneficiaries": 2,
    }


    # =====================================================
    # BENEFICIARIES
    # =====================================================

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


    # =====================================================
    # LIVE INR → NPR RATE
    # =====================================================

    inr_response = get_exchange_rates("INR")

    inr_to_npr = None

    if inr_response.get("success"):
        inr_to_npr = (
            inr_response
            .get("rates", {})
            .get("NPR")
        )


    # =====================================================
    # LIVE NPR → INR RATE
    # =====================================================

    npr_response = get_exchange_rates("NPR")

    npr_to_inr = None

    if npr_response.get("success"):
        npr_to_inr = (
            npr_response
            .get("rates", {})
            .get("INR")
        )


    # =====================================================
    # EXCHANGE RATES
    # =====================================================

    exchange_rates = []


    # -----------------------------------------------------
    # INDIA → NEPAL
    # -----------------------------------------------------

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


    # -----------------------------------------------------
    # NEPAL → INDIA
    # -----------------------------------------------------

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


    # =====================================================
    # RECENT TRANSACTIONS
    # =====================================================

    # IMPORTANT:
    # amount_sent and amount_received MUST remain numeric.
    # The dashboard formats these values according to
    # their respective currencies.

    transactions = [

        # -------------------------------------------------
        # INDIA → NEPAL
        # -------------------------------------------------

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


        # -------------------------------------------------
        # NEPAL → INDIA
        # -------------------------------------------------

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


    # =====================================================
    # RENDER DASHBOARD
    # =====================================================

    return render_template(
        "customer/dashboard.html",

        customer=customer,

        stats=stats,

        transactions=transactions,

        beneficiaries=beneficiaries,

        exchange_rates=exchange_rates,

        # Live rates available to dashboard.js
        inr_to_npr=inr_to_npr,
        npr_to_inr=npr_to_inr,
    )