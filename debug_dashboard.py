import re
from pathlib import Path


# =========================================================
# CONFIGURATION
# =========================================================

TEMPLATE = Path(
    "templates/customer/dashboard.html"
)


# =========================================================
# HELPER
# =========================================================

def find_fields(pattern, content):

    return sorted(
        set(
            re.findall(
                pattern,
                content,
                re.IGNORECASE
            )
        )
    )


# =========================================================
# MAIN DIAGNOSTIC
# =========================================================

def diagnose():

    print()
    print("=" * 80)
    print("ONE INDIA — CUSTOMER DASHBOARD DIAGNOSTICS")
    print("=" * 80)


    # -----------------------------------------------------
    # Check template
    # -----------------------------------------------------

    if not TEMPLATE.exists():

        print()
        print("ERROR:")
        print(f"Dashboard template not found:")
        print(f"  {TEMPLATE}")
        print()

        return


    content = TEMPLATE.read_text(
        encoding="utf-8"
    )


    print()
    print(f"Template:")
    print(f"  {TEMPLATE}")


    # -----------------------------------------------------
    # Stats
    # -----------------------------------------------------

    stats = find_fields(
        r"stats\.([a-zA-Z_][a-zA-Z0-9_]*)",
        content
    )

    print()
    print("[STATS]")
    print("-" * 80)

    if stats:

        for field in stats:
            print(f"  stats.{field}")

    else:
        print("  None found")


    # -----------------------------------------------------
    # Transactions
    # -----------------------------------------------------

    transactions = find_fields(
        r"transaction\.([a-zA-Z_][a-zA-Z0-9_]*)",
        content
    )

    print()
    print("[TRANSACTIONS]")
    print("-" * 80)

    if transactions:

        for field in transactions:
            print(f"  transaction.{field}")

    else:
        print("  None found")


    # -----------------------------------------------------
    # Customer
    # -----------------------------------------------------

    customer = find_fields(
        r"customer\.([a-zA-Z_][a-zA-Z0-9_]*)",
        content
    )

    print()
    print("[CUSTOMER]")
    print("-" * 80)

    if customer:

        for field in customer:
            print(f"  customer.{field}")

    else:
        print("  None found")


    # -----------------------------------------------------
    # Beneficiary
    # -----------------------------------------------------

    beneficiary = find_fields(
        r"beneficiar(?:y|ies)\.([a-zA-Z_][a-zA-Z0-9_]*)",
        content
    )

    print()
    print("[BENEFICIARY]")
    print("-" * 80)

    if beneficiary:

        for field in beneficiary:
            print(f"  beneficiary.{field}")

    else:
        print("  None found")


    # -----------------------------------------------------
    # Exchange rates
    # -----------------------------------------------------

    exchange_rates = find_fields(
        r"exchange_rates\.([a-zA-Z_][a-zA-Z0-9_]*)",
        content
    )

    print()
    print("[EXCHANGE RATES]")
    print("-" * 80)

    if exchange_rates:

        for field in exchange_rates:
            print(f"  exchange_rates.{field}")

    else:
        print("  None found")


    # -----------------------------------------------------
    # Summary
    # -----------------------------------------------------

    print()
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)

    print(f"Stats fields        : {len(stats)}")
    print(f"Transaction fields  : {len(transactions)}")
    print(f"Customer fields     : {len(customer)}")
    print(f"Beneficiary fields  : {len(beneficiary)}")
    print(f"Exchange-rate fields: {len(exchange_rates)}")

    print()
    print("=" * 80)
    print("DIAGNOSTIC COMPLETE")
    print("=" * 80)
    print()


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":
    diagnose()