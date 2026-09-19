import requests

FRANKFURTER_URL = "https://api.frankfurter.dev/v2/rates"

SUPPORTED_CORRIDOR = {
    "INR": {
        "country": "India",
        "flag": "🇮🇳",
        "currency": "INR",
    },
    "NPR": {
        "country": "Nepal",
        "flag": "🇳🇵",
        "currency": "NPR",
    },
}


def get_exchange_rates(base_currency="INR"):
    """
    Fetch the latest live exchange rate for the
    India <-> Nepal remittance corridor.

    Supported:
        INR -> NPR
        NPR -> INR
    """

    base_currency = base_currency.upper()

    if base_currency not in SUPPORTED_CORRIDOR:
        return {
            "success": False,
            "base": base_currency,
            "rates": {},
            "error": (
                f"Unsupported base currency '{base_currency}'. "
                "Currently supported currencies are INR and NPR."
            ),
        }

    try:
        response = requests.get(
            FRANKFURTER_URL,
            params={
                "base": base_currency,
            },
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        rates = {}

        for item in data:
            currency = item.get("quote")
            rate = item.get("rate")

            # Only keep the opposite currency
            # in the India <-> Nepal corridor.
            if base_currency == "INR" and currency == "NPR":
                rates["NPR"] = float(rate)

            elif base_currency == "NPR" and currency == "INR":
                rates["INR"] = float(rate)

        if not rates:
            return {
                "success": False,
                "base": base_currency,
                "rates": {},
                "error": (
                    f"No exchange rate was returned for "
                    f"{base_currency}."
                ),
            }

        return {
            "success": True,
            "base": base_currency,
            "rates": rates,
        }

    except requests.RequestException as error:
        return {
            "success": False,
            "base": base_currency,
            "rates": {},
            "error": str(error),
        }

    except (ValueError, TypeError) as error:
        return {
            "success": False,
            "base": base_currency,
            "rates": {},
            "error": f"Invalid exchange rate received: {error}",
        }