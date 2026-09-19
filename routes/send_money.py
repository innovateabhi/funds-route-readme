from flask import Blueprint, render_template

from services.currency_service import get_exchange_rates


# =========================================================
# SEND MONEY BLUEPRINT
# =========================================================

send_money_bp = Blueprint(
    "send_money",
    __name__,
    url_prefix="/customer/send-money"
)


# =========================================================
# SEND MONEY PAGE
# =========================================================

@send_money_bp.route("/")
def send_money():

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
    # BENEFICIARIES
    # =====================================================

    beneficiaries = [

        {
            "id": 1,
            "name": "Rajesh Sharma",
            "country": "Nepal",
            "currency": "NPR",
            "flag": "🇳🇵",
            "account": "•••• 4521",
            "bank": "Nepal Bank",
        },

        {
            "id": 2,
            "name": "Amit Roy",
            "country": "India",
            "currency": "INR",
            "flag": "🇮🇳",
            "account": "•••• 7824",
            "bank": "State Bank of India",
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
    # RENDER
    # =====================================================

    return render_template(
        "customer/send-money.html",

        customer=customer,

        beneficiaries=beneficiaries,

        inr_to_npr=inr_to_npr,

        npr_to_inr=npr_to_inr,
    )