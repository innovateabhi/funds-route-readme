document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // QUICK TRANSFER ELEMENTS
    // =========================================================

    const transferSwitch = document.getElementById("transferSwitch");

    const sendFlag = document.getElementById("sendFlag");
    const sendCountry = document.getElementById("sendCountry");
    const sendCurrency = document.getElementById("sendCurrency");

    const receiveFlag = document.getElementById("receiveFlag");
    const receiveCountry = document.getElementById("receiveCountry");
    const receiveCurrency = document.getElementById("receiveCurrency");

    const sendCurrencyLabel = document.getElementById("sendCurrencyLabel");

    const sendAmountFlag = document.getElementById("sendAmountFlag");
    const sendAmountCurrency = document.getElementById("sendAmountCurrency");
    const sendAmountCurrencyName = document.getElementById(
        "sendAmountCurrencyName"
    );

    const sendAmount = document.getElementById("sendAmount");

    const exchangeRateText = document.getElementById(
        "exchangeRateText"
    );

    const receiveAmountFlag = document.getElementById(
        "receiveAmountFlag"
    );

    const receiveAmountCurrency = document.getElementById(
        "receiveAmountCurrency"
    );

    const receiveAmountCurrencyName = document.getElementById(
        "receiveAmountCurrencyName"
    );

    const receiveAmount = document.getElementById(
        "receiveAmount"
    );

    const transferFee = document.getElementById(
        "transferFee"
    );

    const summaryRate = document.getElementById(
        "summaryRate"
    );

    const totalPayable = document.getElementById(
        "totalPayable"
    );

    const continueTransfer = document.getElementById(
        "continueTransfer"
    );


    // =========================================================
    // LIVE RATE ELEMENTS
    // =========================================================

    const refreshRates = document.getElementById(
        "refreshRates"
    );

    const dashboardInrNprRate = document.getElementById(
        "dashboardInrNprRate"
    );

    const dashboardNprInrRate = document.getElementById(
        "dashboardNprInrRate"
    );


    // =========================================================
    // APPLICATION STATE
    // =========================================================

    let currentDirection = "INR_NPR";

    let inrToNpr = null;
    let nprToInr = null;

    const FEE = 49;


    // =========================================================
    // CURRENCY INFORMATION
    // =========================================================

    const currencyData = {

        INR: {
            country: "India",
            flag: "🇮🇳",
            shortFlag: "IN",
            currencyName: "Indian Rupee"
        },

        NPR: {
            country: "Nepal",
            flag: "🇳🇵",
            shortFlag: "NP",
            currencyName: "Nepalese Rupee"
        }

    };


    // =========================================================
    // FORMAT MONEY
    // =========================================================

    function formatNumber(value, decimals = 2) {

        if (
            value === null ||
            value === undefined ||
            Number.isNaN(Number(value))
        ) {
            return "—";
        }

        return Number(value).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }
        );
    }


    // =========================================================
    // FORMAT CURRENCY
    // =========================================================

    function formatCurrency(value, currency) {

        if (
            value === null ||
            value === undefined ||
            Number.isNaN(Number(value))
        ) {
            return "—";
        }

        const formatted = formatNumber(value, 2);

        if (currency === "INR") {
            return `₹${formatted}`;
        }

        if (currency === "NPR") {
            return `NPR ${formatted}`;
        }

        return `${currency} ${formatted}`;
    }


    // =========================================================
    // GET CURRENT RATE
    // =========================================================

    function getCurrentRate() {

        if (currentDirection === "INR_NPR") {
            return inrToNpr;
        }

        return nprToInr;
    }


    // =========================================================
    // UPDATE TRANSFER CURRENCIES
    // =========================================================

    function updateTransferDirection() {

        let sendCurrencyCode;
        let receiveCurrencyCode;

        if (currentDirection === "INR_NPR") {

            sendCurrencyCode = "INR";
            receiveCurrencyCode = "NPR";

        } else {

            sendCurrencyCode = "NPR";
            receiveCurrencyCode = "INR";

        }


        const send = currencyData[sendCurrencyCode];
        const receive = currencyData[receiveCurrencyCode];


        // -----------------------------------------------------
        // DIRECTION SELECTOR
        // -----------------------------------------------------

        if (sendFlag) {
            sendFlag.textContent = send.flag;
        }

        if (sendCountry) {
            sendCountry.textContent = send.country;
        }

        if (sendCurrency) {
            sendCurrency.textContent = sendCurrencyCode;
        }


        if (receiveFlag) {
            receiveFlag.textContent = receive.flag;
        }

        if (receiveCountry) {
            receiveCountry.textContent = receive.country;
        }

        if (receiveCurrency) {
            receiveCurrency.textContent = receiveCurrencyCode;
        }


        // -----------------------------------------------------
        // SEND AMOUNT BOX
        // -----------------------------------------------------

        if (sendCurrencyLabel) {
            sendCurrencyLabel.textContent = sendCurrencyCode;
        }

        if (sendAmountFlag) {
            sendAmountFlag.textContent = send.shortFlag;
        }

        if (sendAmountCurrency) {
            sendAmountCurrency.textContent = sendCurrencyCode;
        }

        if (sendAmountCurrencyName) {
            sendAmountCurrencyName.textContent =
                send.currencyName;
        }


        // -----------------------------------------------------
        // RECEIVE AMOUNT BOX
        // -----------------------------------------------------

        if (receiveAmountFlag) {
            receiveAmountFlag.textContent =
                receive.shortFlag;
        }

        if (receiveAmountCurrency) {
            receiveAmountCurrency.textContent =
                receiveCurrencyCode;
        }

        if (receiveAmountCurrencyName) {
            receiveAmountCurrencyName.textContent =
                receive.currencyName;
        }


        // -----------------------------------------------------
        // RECALCULATE
        // -----------------------------------------------------

        calculateTransfer();

    }


    // =========================================================
    // CALCULATE TRANSFER
    // =========================================================

    function calculateTransfer() {

        if (!sendAmount || !receiveAmount) {
            return;
        }


        const amount = Number(
            sendAmount.value
        );


        const rate = getCurrentRate();


        // -----------------------------------------------------
        // RATE NOT AVAILABLE
        // -----------------------------------------------------

        if (
            rate === null ||
            rate === undefined ||
            Number.isNaN(Number(rate))
        ) {

            receiveAmount.textContent = "—";

            if (exchangeRateText) {
                exchangeRateText.textContent =
                    "Loading...";
            }

            if (summaryRate) {
                summaryRate.textContent =
                    "Loading...";
            }

            updateTotal();

            return;
        }


        // -----------------------------------------------------
        // VALIDATE AMOUNT
        // -----------------------------------------------------

        if (
            Number.isNaN(amount) ||
            amount < 0
        ) {

            receiveAmount.textContent = "—";

            if (exchangeRateText) {
                exchangeRateText.textContent =
                    `1 ${getSendCurrency()} = ${formatNumber(rate, 4)} ${getReceiveCurrency()}`;
            }

            if (summaryRate) {
                summaryRate.textContent =
                    `${formatNumber(rate, 4)}`;
            }

            updateTotal();

            return;
        }


        // -----------------------------------------------------
        // CALCULATE RECIPIENT AMOUNT
        // -----------------------------------------------------

        const convertedAmount = amount * Number(rate);


        // -----------------------------------------------------
        // DISPLAY RECIPIENT AMOUNT
        // -----------------------------------------------------

        receiveAmount.textContent =
            formatNumber(convertedAmount, 2);


        // -----------------------------------------------------
        // DISPLAY RATE
        // -----------------------------------------------------

        const sendCurrencyCode =
            getSendCurrency();

        const receiveCurrencyCode =
            getReceiveCurrency();


        if (exchangeRateText) {

            exchangeRateText.textContent =
                `1 ${sendCurrencyCode} = ${formatNumber(rate, 4)} ${receiveCurrencyCode}`;

        }


        if (summaryRate) {

            summaryRate.textContent =
                `1 ${sendCurrencyCode} = ${formatNumber(rate, 4)} ${receiveCurrencyCode}`;

        }


        // -----------------------------------------------------
        // TOTAL
        // -----------------------------------------------------

        updateTotal();

    }


    // =========================================================
    // GET SEND CURRENCY
    // =========================================================

    function getSendCurrency() {

        if (currentDirection === "INR_NPR") {
            return "INR";
        }

        return "NPR";
    }


    // =========================================================
    // GET RECEIVE CURRENCY
    // =========================================================

    function getReceiveCurrency() {

        if (currentDirection === "INR_NPR") {
            return "NPR";
        }

        return "INR";
    }


    // =========================================================
    // UPDATE TOTAL PAYABLE
    // =========================================================

    function updateTotal() {

        if (!totalPayable || !sendAmount) {
            return;
        }


        const amount = Number(
            sendAmount.value
        );


        if (
            Number.isNaN(amount) ||
            amount < 0
        ) {

            totalPayable.textContent =
                formatCurrency(
                    FEE,
                    getSendCurrency()
                );

            return;
        }


        const total = amount + FEE;


        totalPayable.textContent =
            formatCurrency(
                total,
                getSendCurrency()
            );

    }


    // =========================================================
    // FETCH LIVE RATE
    // =========================================================

    async function fetchRate(baseCurrency) {

        try {

            const response = await fetch(
                `/api/rates?base=${baseCurrency}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    },
                    cache: "no-store"
                }
            );


            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }


            const data = await response.json();


            console.log(
                `Live ${baseCurrency} rate response:`,
                data
            );


            // -------------------------------------------------
            // SUPPORT BOTH API RESPONSE FORMATS
            // -------------------------------------------------

            let result = data;


            /*
             * Format 1:
             *
             * {
             *   success: true,
             *   base: "INR",
             *   rates: {
             *      NPR: 1.6017
             *   }
             * }
             *
             *
             * Format 2:
             *
             * {
             *   success: true,
             *   base: "INR",
             *   rates: {
             *      success: true,
             *      base: "INR",
             *      rates: {
             *          NPR: 1.6017
             *      }
             *   }
             * }
             */


            if (
                result.rates &&
                result.rates.success &&
                result.rates.rates
            ) {

                result = result.rates;

            }


            if (!result.success) {

                throw new Error(
                    result.error ||
                    "Exchange rate request failed."
                );

            }


            const rates =
                result.rates || {};


            if (baseCurrency === "INR") {

                if (
                    rates.NPR === undefined ||
                    rates.NPR === null
                ) {

                    throw new Error(
                        "INR → NPR rate not found."
                    );

                }

                inrToNpr =
                    Number(rates.NPR);

            }


            if (baseCurrency === "NPR") {

                if (
                    rates.INR === undefined ||
                    rates.INR === null
                ) {

                    throw new Error(
                        "NPR → INR rate not found."
                    );

                }

                nprToInr =
                    Number(rates.INR);

            }


            return true;

        } catch (error) {

            console.error(
                `Failed to fetch ${baseCurrency} rate:`,
                error
            );

            return false;

        }

    }


    // =========================================================
    // LOAD ALL LIVE RATES
    // =========================================================

    async function loadRates() {

        setRateLoadingState();


        const inrSuccess =
            await fetchRate("INR");


        const nprSuccess =
            await fetchRate("NPR");


        // -----------------------------------------------------
        // UPDATE LIVE RATE CARDS
        // -----------------------------------------------------

        if (
            dashboardInrNprRate &&
            inrSuccess &&
            inrToNpr !== null
        ) {

            dashboardInrNprRate.textContent =
                Number(inrToNpr).toFixed(4);

        }


        if (
            dashboardNprInrRate &&
            nprSuccess &&
            nprToInr !== null
        ) {

            dashboardNprInrRate.textContent =
                Number(nprToInr).toFixed(4);

        }


        // -----------------------------------------------------
        // UPDATE QUICK TRANSFER
        // -----------------------------------------------------

        calculateTransfer();

    }


    // =========================================================
    // RATE LOADING STATE
    // =========================================================

    function setRateLoadingState() {

        if (exchangeRateText) {
            exchangeRateText.textContent =
                "Loading...";
        }

        if (summaryRate) {
            summaryRate.textContent =
                "Loading...";
        }

    }


    // =========================================================
    // SWITCH INDIA ↔ NEPAL
    // =========================================================

    if (transferSwitch) {

        transferSwitch.addEventListener(
            "click",
            () => {

                if (
                    currentDirection === "INR_NPR"
                ) {

                    currentDirection =
                        "NPR_INR";

                } else {

                    currentDirection =
                        "INR_NPR";

                }


                updateTransferDirection();

            }
        );

    }


    // =========================================================
    // AMOUNT INPUT
    // =========================================================

    if (sendAmount) {

        sendAmount.addEventListener(
            "input",
            () => {

                calculateTransfer();

            }
        );

    }


    // =========================================================
    // REFRESH RATES
    // =========================================================

    if (refreshRates) {

        refreshRates.addEventListener(
            "click",
            async () => {

                refreshRates.disabled = true;

                const originalText =
                    refreshRates.innerHTML;

                refreshRates.innerHTML =
                    "Refreshing...";


                await loadRates();


                refreshRates.disabled = false;

                refreshRates.innerHTML =
                    originalText;

            }
        );

    }


    // =========================================================
    // CONTINUE TRANSFER
    // =========================================================

    if (continueTransfer) {

        continueTransfer.addEventListener(
            "click",
            () => {

                const amount =
                    Number(sendAmount?.value || 0);


                if (
                    !amount ||
                    amount <= 0
                ) {

                    alert(
                        "Please enter a valid transfer amount."
                    );

                    sendAmount?.focus();

                    return;

                }


                const rate =
                    getCurrentRate();


                if (
                    !rate ||
                    Number.isNaN(Number(rate))
                ) {

                    alert(
                        "Exchange rate is still loading. Please try again in a moment."
                    );

                    return;

                }


                /*
                 * The actual Send Money workflow
                 * will be connected here later.
                 */

                console.log(
                    "Continue Transfer",
                    {
                        direction:
                            currentDirection,

                        sendCurrency:
                            getSendCurrency(),

                        receiveCurrency:
                            getReceiveCurrency(),

                        amount: amount,

                        rate: rate,

                        fee: FEE,

                        total:
                            amount + FEE,

                        recipientAmount:
                            amount * rate
                    }
                );


                alert(
                    "Transfer workflow will be connected here next."
                );

            }
        );

    }


    // =========================================================
    // INITIALIZE
    // =========================================================

    updateTransferDirection();

    loadRates();

});