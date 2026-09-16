document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    // Direction
    const directionIndiaNepal =
        document.getElementById("directionIndiaNepal");

    const directionNepalIndia =
        document.getElementById("directionNepalIndia");

    const directionSwitch =
        document.getElementById("directionSwitch");

    // Transfer details
    const transferDetailsTitle =
        document.getElementById("transferDetailsTitle");

    const transferDetailsDescription =
        document.getElementById("transferDetailsDescription");

    const transferRouteHint =
        document.getElementById("transferRouteHint");

    // Beneficiaries
    const beneficiarySelector =
        document.getElementById("beneficiarySelector");

    const beneficiaryEmpty =
        document.getElementById("beneficiaryEmpty");

    const addBeneficiaryButton =
        document.getElementById("addBeneficiaryButton");

    const emptyAddBeneficiaryButton =
        document.getElementById("emptyAddBeneficiaryButton");

    // Amount
    const sendMoneyFlag =
        document.getElementById("sendMoneyFlag");

    const sendMoneyCurrency =
        document.getElementById("sendMoneyCurrency");

    const sendMoneyCurrencyName =
        document.getElementById("sendMoneyCurrencyName");

    const sendMoneyAmount =
        document.getElementById("sendMoneyAmount");

    // Recipient preview
    const sendMoneyRecipientAmount =
        document.getElementById("sendMoneyRecipientAmount");

    const sendMoneyRecipientCurrency =
        document.getElementById("sendMoneyRecipientCurrency");

    // Summary
    const sendMoneyRate =
        document.getElementById("sendMoneyRate");

    const sendMoneyFee =
        document.getElementById("sendMoneyFee");

    const sendMoneyTotal =
        document.getElementById("sendMoneyTotal");

    const sendMoneyContinue =
        document.getElementById("sendMoneyContinue");

    // Overview
    const overviewSendFlag =
        document.getElementById("overviewSendFlag");

    const overviewSendCountry =
        document.getElementById("overviewSendCountry");

    const overviewSendCurrency =
        document.getElementById("overviewSendCurrency");

    const overviewReceiveFlag =
        document.getElementById("overviewReceiveFlag");

    const overviewReceiveCountry =
        document.getElementById("overviewReceiveCountry");

    const overviewReceiveCurrency =
        document.getElementById("overviewReceiveCurrency");

    const overviewBeneficiaryAvatar =
        document.getElementById("overviewBeneficiaryAvatar");

    const overviewBeneficiaryName =
        document.getElementById("overviewBeneficiaryName");

    const overviewBeneficiaryBank =
        document.getElementById("overviewBeneficiaryBank");

    const overviewSendAmount =
        document.getElementById("overviewSendAmount");

    const overviewReceiveAmount =
        document.getElementById("overviewReceiveAmount");

    const overviewFee =
        document.getElementById("overviewFee");

    const overviewTotal =
        document.getElementById("overviewTotal");

    const overviewRate =
        document.getElementById("overviewRate");

    // Modal
    const beneficiaryModal =
        document.getElementById("beneficiaryModal");

    const beneficiaryModalClose =
        document.getElementById("beneficiaryModalClose");

    const beneficiaryModalCancel =
        document.getElementById("beneficiaryModalCancel");

    const beneficiaryForm =
        document.getElementById("beneficiaryForm");

    const beneficiaryName =
        document.getElementById("beneficiaryName");

    const beneficiaryCountry =
        document.getElementById("beneficiaryCountry");

    const beneficiaryBank =
        document.getElementById("beneficiaryBank");

    const beneficiaryAccount =
        document.getElementById("beneficiaryAccount");

    const beneficiaryBranch =
        document.getElementById("beneficiaryBranch");

    const beneficiaryIfsc =
        document.getElementById("beneficiaryIfsc");

    const beneficiaryIfscLabel =
        document.getElementById("beneficiaryIfscLabel");

    const beneficiaryFormError =
        document.getElementById("beneficiaryFormError");

    // Backend rate data
    const sendMoneyData =
        document.getElementById("send-money-data");


    /* =====================================================
       INITIAL RATE DATA
    ===================================================== */

    const initialInrToNpr =
        sendMoneyData?.dataset.inrToNpr
            ? parseFloat(sendMoneyData.dataset.inrToNpr)
            : null;

    const initialNprToInr =
        sendMoneyData?.dataset.nprToInr
            ? parseFloat(sendMoneyData.dataset.nprToInr)
            : null;


    /* =====================================================
       TRANSFER STATE
    ===================================================== */

    let direction = "INR_NPR";

    let currentRate = initialInrToNpr;

    let selectedBeneficiary = null;


    /* =====================================================
       TRANSFER CONFIGURATION
    ===================================================== */

    const transferConfig = {

        INR_NPR: {

            sendCountry: "India",

            sendCurrency: "INR",

            sendCurrencyName: "Indian Rupee",

            sendFlag: "🇮🇳",

            receiveCountry: "Nepal",

            receiveCurrency: "NPR",

            receiveCurrencyName: "Nepalese Rupee",

            receiveFlag: "🇳🇵",

            fee: 49

        },

        NPR_INR: {

            sendCountry: "Nepal",

            sendCurrency: "NPR",

            sendCurrencyName: "Nepalese Rupee",

            sendFlag: "🇳🇵",

            receiveCountry: "India",

            receiveCurrency: "INR",

            receiveCurrencyName: "Indian Rupee",

            receiveFlag: "🇮🇳",

            fee: 49

        }

    };


    /* =====================================================
       UTILITY FUNCTIONS
    ===================================================== */

    function getConfig() {
        return transferConfig[direction];
    }


    function getCurrencySymbol(currency) {

        if (currency === "INR") {
            return "₹";
        }

        if (currency === "NPR") {
            return "NPR ";
        }

        return `${currency} `;

    }


    function formatMoney(amount, currency) {

        if (
            amount === null ||
            amount === undefined ||
            Number.isNaN(Number(amount))
        ) {
            return "—";
        }

        const numericAmount = Number(amount);

        return `${getCurrencySymbol(currency)}${numericAmount.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;

    }


    function formatCompactMoney(amount, currency) {

        if (
            amount === null ||
            amount === undefined ||
            Number.isNaN(Number(amount))
        ) {
            return "—";
        }

        const numericAmount = Number(amount);

        return `${getCurrencySymbol(currency)}${numericAmount.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        )}`;

    }


    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function maskAccount(account) {

        const value = String(account ?? "").trim();

        if (!value) {
            return "••••";
        }

        if (value.includes("••••")) {
            return value;
        }

        if (value.length <= 4) {
            return `•••• ${value}`;
        }

        return `•••• ${value.slice(-4)}`;

    }


    /* =====================================================
       TRANSFER DETAILS HEADER
    ===================================================== */

    function updateTransferDetails() {

        const config = getConfig();

        if (transferDetailsTitle) {

            transferDetailsTitle.textContent =
                `Sending from ${config.sendCountry} to ${config.receiveCountry}`;

        }


        if (transferDetailsDescription) {

            transferDetailsDescription.textContent =
                `Select your ${config.receiveCountry} recipient and enter the amount in ${config.sendCurrency}.`;

        }

    }


    /* =====================================================
       ROUTE HINT
    ===================================================== */

    function updateRouteHint() {

        const config = getConfig();

        if (!transferRouteHint) {
            return;
        }

        const textElement =
            transferRouteHint.querySelector("span");

        if (textElement) {

            textElement.textContent =
                `Sending from ${config.sendCountry} to ${config.receiveCountry}`;

        }

    }


    /* =====================================================
       DIRECTION BUTTON STATE
    ===================================================== */

    function updateDirectionButtons() {

        if (!directionIndiaNepal || !directionNepalIndia) {
            return;
        }

        const indiaActive =
            direction === "INR_NPR";

        const nepalActive =
            direction === "NPR_INR";


        directionIndiaNepal.classList.toggle(
            "active",
            indiaActive
        );

        directionNepalIndia.classList.toggle(
            "active",
            nepalActive
        );


        directionIndiaNepal.setAttribute(
            "aria-pressed",
            String(indiaActive)
        );

        directionNepalIndia.setAttribute(
            "aria-pressed",
            String(nepalActive)
        );

    }


    /* =====================================================
       UPDATE SENDING CURRENCY
    ===================================================== */

    function updateSendingCurrency() {

        const config = getConfig();

        if (sendMoneyFlag) {

            sendMoneyFlag.textContent =
                config.sendFlag;

        }


        if (sendMoneyCurrency) {

            sendMoneyCurrency.textContent =
                config.sendCurrency;

        }


        if (sendMoneyCurrencyName) {

            sendMoneyCurrencyName.textContent =
                config.sendCurrencyName;

        }


        if (sendMoneyAmount) {

            sendMoneyAmount.setAttribute(
                "aria-label",
                `Amount to send in ${config.sendCurrency}`
            );

        }

    }


    /* =====================================================
       UPDATE RECIPIENT CURRENCY
    ===================================================== */

    function updateRecipientCurrency() {

        const config = getConfig();

        if (sendMoneyRecipientCurrency) {

            sendMoneyRecipientCurrency.textContent =
                config.receiveCurrency;

        }

    }


    /* =====================================================
       UPDATE OVERVIEW ROUTE
    ===================================================== */

    function updateOverviewRoute() {

        const config = getConfig();


        if (overviewSendFlag) {

            overviewSendFlag.textContent =
                config.sendFlag;

        }


        if (overviewSendCountry) {

            overviewSendCountry.textContent =
                config.sendCountry;

        }


        if (overviewSendCurrency) {

            overviewSendCurrency.textContent =
                config.sendCurrency;

        }


        if (overviewReceiveFlag) {

            overviewReceiveFlag.textContent =
                config.receiveFlag;

        }


        if (overviewReceiveCountry) {

            overviewReceiveCountry.textContent =
                config.receiveCountry;

        }


        if (overviewReceiveCurrency) {

            overviewReceiveCurrency.textContent =
                config.receiveCurrency;

        }

    }


    /* =====================================================
       UPDATE FEE
    ===================================================== */

    function updateFee() {

        const config = getConfig();

        if (sendMoneyFee) {

            sendMoneyFee.textContent =
                `${config.sendCurrency} ${config.fee}`;

        }


        if (overviewFee) {

            overviewFee.textContent =
                `${config.sendCurrency} ${config.fee}`;

        }

    }


    /* =====================================================
       UPDATE OVERVIEW BENEFICIARY
    ===================================================== */

    function updateOverviewBeneficiary() {

        if (!selectedBeneficiary) {

            if (overviewBeneficiaryAvatar) {
                overviewBeneficiaryAvatar.textContent = "?";
            }

            if (overviewBeneficiaryName) {
                overviewBeneficiaryName.textContent =
                    "Select a recipient";
            }

            if (overviewBeneficiaryBank) {
                overviewBeneficiaryBank.textContent =
                    "Choose a beneficiary for this transfer";
            }

            return;
        }


        if (overviewBeneficiaryAvatar) {

            overviewBeneficiaryAvatar.textContent =
                String(selectedBeneficiary.name || "?")
                    .trim()
                    .charAt(0)
                    .toUpperCase();

        }


        if (overviewBeneficiaryName) {

            overviewBeneficiaryName.textContent =
                selectedBeneficiary.name;

        }


        if (overviewBeneficiaryBank) {

            const bank =
                selectedBeneficiary.bank || "Bank";

            const account =
                maskAccount(selectedBeneficiary.account);

            overviewBeneficiaryBank.textContent =
                `${bank} · ${account}`;

        }

    }


    /* =====================================================
       FILTER BENEFICIARIES
    ===================================================== */

    function filterBeneficiaries() {

        if (!beneficiarySelector) {
            return;
        }

        const config = getConfig();

        const options =
            Array.from(
                beneficiarySelector.querySelectorAll(
                    ".beneficiary-option"
                )
            );


        let visibleCount = 0;

        let firstVisibleOption = null;


        options.forEach(option => {

            const country =
                option.dataset.country || "";

            const matches =
                country.toLowerCase() ===
                config.receiveCountry.toLowerCase();


            option.hidden = !matches;

            option.classList.remove("active");


            if (matches) {

                visibleCount++;

                if (!firstVisibleOption) {
                    firstVisibleOption = option;
                }

            }

        });


        if (beneficiaryEmpty) {

            beneficiaryEmpty.hidden =
                visibleCount !== 0;

        }


        if (firstVisibleOption) {

            selectBeneficiary(firstVisibleOption);

        } else {

            selectedBeneficiary = null;

            updateOverviewBeneficiary();

        }

    }


    /* =====================================================
       SELECT BENEFICIARY
    ===================================================== */

    function selectBeneficiary(option) {

        if (!option) {
            return;
        }


        const config = getConfig();

        const country =
            option.dataset.country || "";


        if (
            country.toLowerCase() !==
            config.receiveCountry.toLowerCase()
        ) {
            return;
        }


        const options =
            beneficiarySelector
                ? beneficiarySelector.querySelectorAll(
                    ".beneficiary-option"
                )
                : [];


        options.forEach(item => {

            item.classList.remove("active");

        });


        option.classList.add("active");


        selectedBeneficiary = {

            id:
                option.dataset.beneficiary || "",

            name:
                option.dataset.name || "Beneficiary",

            country:
                option.dataset.country || "",

            currency:
                option.dataset.currency || "",

            bank:
                option.dataset.bank || "",

            account:
                option.dataset.account || ""

        };


        updateOverviewBeneficiary();

    }


    /* =====================================================
       LOAD LOCAL BENEFICIARIES
    ===================================================== */

    function loadStoredBeneficiaries() {

        let stored = [];

        try {

            stored =
                JSON.parse(
                    localStorage.getItem(
                        "oigr_beneficiaries"
                    ) || "[]"
                );

        } catch (error) {

            stored = [];

        }


        if (!Array.isArray(stored) || !beneficiarySelector) {
            return;
        }


        stored.forEach(beneficiary => {

            addBeneficiaryToDOM(
                beneficiary,
                false
            );

        });

    }


    /* =====================================================
       ADD BENEFICIARY TO DOM
    ===================================================== */

    function addBeneficiaryToDOM(
        beneficiary,
        selectAfterAdd = true
    ) {

        if (!beneficiarySelector) {
            return null;
        }


        const config = getConfig();


        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "beneficiary-option";


        button.dataset.beneficiary =
            beneficiary.id || `local-${Date.now()}`;

        button.dataset.country =
            beneficiary.country || "";

        button.dataset.currency =
            beneficiary.currency || "";

        button.dataset.name =
            beneficiary.name || "";

        button.dataset.bank =
            beneficiary.bank || "";

        button.dataset.account =
            beneficiary.account || "";


        const avatar =
            document.createElement("span");

        avatar.className =
            "beneficiary-avatar";

        avatar.textContent =
            String(
                beneficiary.name || "?"
            )
            .trim()
            .charAt(0)
            .toUpperCase();


        const details =
            document.createElement("span");

        details.className =
            "beneficiary-details";


        const name =
            document.createElement("strong");

        name.textContent =
            beneficiary.name || "Beneficiary";


        const information =
            document.createElement("span");

        const flag =
            beneficiary.country === "India"
                ? "🇮🇳"
                : "🇳🇵";


        information.textContent =
            `${flag} ${beneficiary.country || ""} · ${beneficiary.bank || "Bank"}`;


        details.appendChild(name);
        details.appendChild(information);


        const account =
            document.createElement("span");

        account.className =
            "beneficiary-account";

        account.textContent =
            maskAccount(beneficiary.account);


        const check =
            document.createElement("span");

        check.className =
            "beneficiary-check";


        const checkIcon =
            document.createElement("i");

        checkIcon.setAttribute(
            "data-lucide",
            "check"
        );


        check.appendChild(checkIcon);


        button.appendChild(avatar);
        button.appendChild(details);
        button.appendChild(account);
        button.appendChild(check);


        beneficiarySelector.appendChild(button);


        button.addEventListener(
            "click",
            () => selectBeneficiary(button)
        );


        if (
            typeof lucide !== "undefined" &&
            lucide.createIcons
        ) {

            lucide.createIcons();

        }


        if (
            selectAfterAdd &&
            beneficiary.country ===
            config.receiveCountry
        ) {

            selectBeneficiary(button);

        }


        return button;

    }


    /* =====================================================
       LOCAL STORAGE SAVE
    ===================================================== */

    function saveBeneficiaryToStorage(
        beneficiary
    ) {

        let stored = [];

        try {

            stored =
                JSON.parse(
                    localStorage.getItem(
                        "oigr_beneficiaries"
                    ) || "[]"
                );

        } catch (error) {

            stored = [];

        }


        if (!Array.isArray(stored)) {
            stored = [];
        }


        stored.push(beneficiary);


        localStorage.setItem(
            "oigr_beneficiaries",
            JSON.stringify(stored)
        );

    }


    /* =====================================================
       MODAL
    ===================================================== */

    function updateModalForDirection() {

        const config = getConfig();


        if (beneficiaryCountry) {

            beneficiaryCountry.value =
                config.receiveCountry;

        }


        if (beneficiaryIfscLabel) {

            beneficiaryIfscLabel.textContent =
                config.receiveCountry === "India"
                    ? "IFSC / Bank code"
                    : "Bank code";

        }


        if (beneficiaryIfsc) {

            beneficiaryIfsc.placeholder =
                config.receiveCountry === "India"
                    ? "Enter IFSC code"
                    : "Enter bank code";

        }

    }


    function openBeneficiaryModal() {

        if (!beneficiaryModal) {
            return;
        }


        updateModalForDirection();


        if (beneficiaryFormError) {

            beneficiaryFormError.hidden = true;

            beneficiaryFormError.textContent = "";

        }


        beneficiaryModal.hidden = false;

        document.body.classList.add(
            "modal-open"
        );


        setTimeout(() => {

            if (beneficiaryName) {
                beneficiaryName.focus();
            }

        }, 50);


        if (
            typeof lucide !== "undefined" &&
            lucide.createIcons
        ) {

            lucide.createIcons();

        }

    }


    function closeBeneficiaryModal() {

        if (!beneficiaryModal) {
            return;
        }


        beneficiaryModal.hidden = true;

        document.body.classList.remove(
            "modal-open"
        );


        if (beneficiaryForm) {
            beneficiaryForm.reset();
        }


        if (beneficiaryFormError) {

            beneficiaryFormError.hidden = true;

            beneficiaryFormError.textContent = "";

        }


        updateModalForDirection();

    }


    /* =====================================================
       MODAL EVENTS
    ===================================================== */

    if (addBeneficiaryButton) {

        addBeneficiaryButton.addEventListener(
            "click",
            openBeneficiaryModal
        );

    }


    if (emptyAddBeneficiaryButton) {

        emptyAddBeneficiaryButton.addEventListener(
            "click",
            openBeneficiaryModal
        );

    }


    if (beneficiaryModalClose) {

        beneficiaryModalClose.addEventListener(
            "click",
            closeBeneficiaryModal
        );

    }


    if (beneficiaryModalCancel) {

        beneficiaryModalCancel.addEventListener(
            "click",
            closeBeneficiaryModal
        );

    }


    if (beneficiaryModal) {

        beneficiaryModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    beneficiaryModal
                ) {

                    closeBeneficiaryModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                beneficiaryModal &&
                !beneficiaryModal.hidden
            ) {

                closeBeneficiaryModal();

            }

        }
    );


    /* =====================================================
       BENEFICIARY FORM SUBMIT
    ===================================================== */

    if (beneficiaryForm) {

        beneficiaryForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const config = getConfig();


                const name =
                    beneficiaryName?.value.trim() || "";

                const country =
                    beneficiaryCountry?.value || "";

                const bank =
                    beneficiaryBank?.value.trim() || "";

                const account =
                    beneficiaryAccount?.value.trim() || "";

                const branch =
                    beneficiaryBranch?.value.trim() || "";

                const ifsc =
                    beneficiaryIfsc?.value.trim() || "";


                if (!name) {

                    showFormError(
                        "Please enter the beneficiary's full name."
                    );

                    beneficiaryName?.focus();

                    return;

                }


                if (!country) {

                    showFormError(
                        "Please select the beneficiary country."
                    );

                    beneficiaryCountry?.focus();

                    return;

                }


                if (
                    country.toLowerCase() !==
                    config.receiveCountry.toLowerCase()
                ) {

                    showFormError(
                        `For this transfer, the beneficiary must be in ${config.receiveCountry}.`
                    );

                    beneficiaryCountry?.focus();

                    return;

                }


                if (!bank) {

                    showFormError(
                        "Please enter the bank name."
                    );

                    beneficiaryBank?.focus();

                    return;

                }


                if (!account) {

                    showFormError(
                        "Please enter the account number."
                    );

                    beneficiaryAccount?.focus();

                    return;

                }


                const beneficiary = {

                    id:
                        `local-${Date.now()}`,

                    name:
                        name,

                    country:
                        country,

                    currency:
                        config.receiveCurrency,

                    flag:
                        config.receiveFlag,

                    bank:
                        bank,

                    account:
                        account,

                    branch:
                        branch,

                    ifsc:
                        ifsc

                };


                saveBeneficiaryToStorage(
                    beneficiary
                );


                const newOption =
                    addBeneficiaryToDOM(
                        beneficiary,
                        true
                    );


                if (newOption) {

                    filterBeneficiaries();

                    selectBeneficiary(
                        newOption
                    );

                }


                closeBeneficiaryModal();

            }
        );

    }


    function showFormError(message) {

        if (!beneficiaryFormError) {
            return;
        }


        beneficiaryFormError.textContent =
            message;

        beneficiaryFormError.hidden =
            false;

    }


    /* =====================================================
       RATE EXTRACTION
    ===================================================== */

    function extractRate(data, currency) {

        if (!data) {
            return null;
        }


        if (
            data.rates &&
            typeof data.rates === "object"
        ) {

            if (
                data.rates[currency] !== undefined
            ) {

                const value =
                    parseFloat(
                        data.rates[currency]
                    );

                return Number.isFinite(value)
                    ? value
                    : null;

            }

        }


        if (data[currency] !== undefined) {

            const value =
                parseFloat(
                    data[currency]
                );

            return Number.isFinite(value)
                ? value
                : null;

        }


        if (data.rate !== undefined) {

            const value =
                parseFloat(data.rate);

            return Number.isFinite(value)
                ? value
                : null;

        }


        return null;

    }


    /* =====================================================
       FETCH LIVE RATE
    ===================================================== */

    async function fetchLiveRate() {

        const config = getConfig();


        if (direction === "INR_NPR") {

            if (initialInrToNpr !== null) {

                currentRate =
                    initialInrToNpr;

            }

        } else {

            if (initialNprToInr !== null) {

                currentRate =
                    initialNprToInr;

            }

        }


        updateRateDisplay();


        try {

            const response =
                await fetch(
                    `/api/rates?base=${encodeURIComponent(
                        config.sendCurrency
                    )}`,
                    {
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }


            const data =
                await response.json();


            const liveRate =
                extractRate(
                    data,
                    config.receiveCurrency
                );


            if (
                liveRate !== null &&
                Number.isFinite(liveRate)
            ) {

                currentRate =
                    liveRate;

            }

        } catch (error) {

            console.warn(
                "Unable to refresh exchange rate:",
                error
            );

        }


        updateRateDisplay();

        calculateTransfer();

    }


    /* =====================================================
       UPDATE RATE DISPLAY
    ===================================================== */

    function updateRateDisplay() {

        const config = getConfig();


        if (
            currentRate === null ||
            !Number.isFinite(currentRate)
        ) {

            if (sendMoneyRate) {
                sendMoneyRate.textContent =
                    "Unavailable";
            }

            if (overviewRate) {
                overviewRate.textContent =
                    "Unavailable";
            }

            return;

        }


        const formattedRate =
            `1 ${config.sendCurrency} = ${Number(
                currentRate
            ).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4
                }
            )} ${config.receiveCurrency}`;


        if (sendMoneyRate) {

            sendMoneyRate.textContent =
                formattedRate;

        }


        if (overviewRate) {

            overviewRate.textContent =
                formattedRate;

        }

    }


    /* =====================================================
       CALCULATE TRANSFER
    ===================================================== */

    function calculateTransfer() {

        const config = getConfig();


        const amount =
            parseFloat(
                sendMoneyAmount?.value || "0"
            );


        if (
            !Number.isFinite(amount) ||
            amount <= 0 ||
            currentRate === null ||
            !Number.isFinite(currentRate)
        ) {

            if (sendMoneyRecipientAmount) {

                sendMoneyRecipientAmount.textContent =
                    "—";

            }


            if (overviewSendAmount) {

                overviewSendAmount.textContent =
                    formatMoney(
                        0,
                        config.sendCurrency
                    );

            }


            if (overviewReceiveAmount) {

                overviewReceiveAmount.textContent =
                    `${config.receiveCurrency} —`;

            }


            if (sendMoneyTotal) {

                sendMoneyTotal.textContent =
                    `${config.sendCurrency} ${config.fee}`;

            }


            if (overviewTotal) {

                overviewTotal.textContent =
                    `${config.sendCurrency} ${config.fee}`;

            }


            return;

        }


        const receivedAmount =
            amount * currentRate;


        const totalPayable =
            amount + config.fee;


        /* =================================================
           RECIPIENT PREVIEW
        ================================================== */

        if (sendMoneyRecipientAmount) {

            sendMoneyRecipientAmount.textContent =
                formatCompactMoney(
                    receivedAmount,
                    config.receiveCurrency
                );

        }


        if (sendMoneyRecipientCurrency) {

            sendMoneyRecipientCurrency.textContent =
                config.receiveCurrency;

        }


        /* =================================================
           TRANSFER SUMMARY
        ================================================== */

        if (sendMoneyFee) {

            sendMoneyFee.textContent =
                `${config.sendCurrency} ${config.fee}`;

        }


        if (sendMoneyTotal) {

            sendMoneyTotal.textContent =
                formatMoney(
                    totalPayable,
                    config.sendCurrency
                );

        }


        /* =================================================
           OVERVIEW
        ================================================== */

        if (overviewSendAmount) {

            overviewSendAmount.textContent =
                formatMoney(
                    amount,
                    config.sendCurrency
                );

        }


        if (overviewReceiveAmount) {

            overviewReceiveAmount.textContent =
                formatMoney(
                    receivedAmount,
                    config.receiveCurrency
                );

        }


        if (overviewFee) {

            overviewFee.textContent =
                `${config.sendCurrency} ${config.fee}`;

        }


        if (overviewTotal) {

            overviewTotal.textContent =
                formatMoney(
                    totalPayable,
                    config.sendCurrency
                );

        }


        updateRateDisplay();

    }


    /* =====================================================
       SET DIRECTION
    ===================================================== */

    function setDirection(
        newDirection
    ) {

        if (
            newDirection !== "INR_NPR" &&
            newDirection !== "NPR_INR"
        ) {
            return;
        }


        direction =
            newDirection;


        const config =
            getConfig();


        /* ================================================
           RATE
        ================================================= */

        if (direction === "INR_NPR") {

            currentRate =
                initialInrToNpr;

        } else {

            currentRate =
                initialNprToInr;

        }


        /* ================================================
           UPDATE EVERYTHING
        ================================================= */

        updateTransferDetails();

        updateRouteHint();

        updateDirectionButtons();

        updateSendingCurrency();

        updateRecipientCurrency();

        updateOverviewRoute();

        updateFee();

        updateModalForDirection();


        /* ================================================
           BENEFICIARIES
        ================================================= */

        filterBeneficiaries();


        /* ================================================
           CALCULATE
        ================================================= */

        calculateTransfer();


        /* ================================================
           REFRESH LIVE RATE
        ================================================= */

        fetchLiveRate();


        /* ================================================
           ICONS
        ================================================= */

        if (
            typeof lucide !== "undefined" &&
            lucide.createIcons
        ) {

            lucide.createIcons();

        }

    }


    /* =====================================================
       DIRECTION BUTTON EVENTS
    ===================================================== */

    if (directionIndiaNepal) {

        directionIndiaNepal.addEventListener(
            "click",
            () => {

                setDirection(
                    "INR_NPR"
                );

            }
        );

    }


    if (directionNepalIndia) {

        directionNepalIndia.addEventListener(
            "click",
            () => {

                setDirection(
                    "NPR_INR"
                );

            }
        );

    }


    /* =====================================================
       TWO-WAY SWITCH BUTTON
    ===================================================== */

    if (directionSwitch) {

        directionSwitch.addEventListener(
            "click",
            () => {

                if (direction === "INR_NPR") {

                    setDirection(
                        "NPR_INR"
                    );

                } else {

                    setDirection(
                        "INR_NPR"
                    );

                }

            }
        );

    }


    /* =====================================================
       BENEFICIARY CLICK EVENTS
    ===================================================== */

    if (beneficiarySelector) {

        beneficiarySelector.addEventListener(
            "click",
            event => {

                const option =
                    event.target.closest(
                        ".beneficiary-option"
                    );


                if (!option) {
                    return;
                }


                selectBeneficiary(option);

            }
        );

    }


    /* =====================================================
       AMOUNT INPUT
    ===================================================== */

    if (sendMoneyAmount) {

        sendMoneyAmount.addEventListener(
            "input",
            calculateTransfer
        );

        sendMoneyAmount.addEventListener(
            "change",
            calculateTransfer
        );

    }


    /* =====================================================
       CONTINUE TO REVIEW
    ===================================================== */

    if (sendMoneyContinue) {

        sendMoneyContinue.addEventListener(
            "click",
            () => {

                const config =
                    getConfig();


                const amount =
                    parseFloat(
                        sendMoneyAmount?.value || "0"
                    );


                /* =========================================
                   VALIDATE AMOUNT
                ========================================= */

                if (
                    !Number.isFinite(amount) ||
                    amount < 100
                ) {

                    alert(
                        `Please enter a valid amount of at least 100 ${config.sendCurrency}.`
                    );

                    sendMoneyAmount?.focus();

                    return;

                }


                /* =========================================
                   VALIDATE BENEFICIARY
                ========================================= */

                if (!selectedBeneficiary) {

                    alert(
                        `Please select a ${config.receiveCountry} beneficiary before continuing.`
                    );

                    return;

                }


                /* =========================================
                   VALIDATE RATE
                ========================================= */

                if (
                    currentRate === null ||
                    !Number.isFinite(currentRate)
                ) {

                    alert(
                        "The exchange rate is currently unavailable. Please try again."
                    );

                    return;

                }


                /* =========================================
                   PREPARE REVIEW DATA
                ========================================= */

                const receivedAmount =
                    amount * currentRate;


                const totalPayable =
                    amount + config.fee;


                const reviewData = {

                    direction:
                        direction,

                    sendCountry:
                        config.sendCountry,

                    sendCurrency:
                        config.sendCurrency,

                    receiveCountry:
                        config.receiveCountry,

                    receiveCurrency:
                        config.receiveCurrency,

                    amount:
                        amount,

                    receivedAmount:
                        receivedAmount,

                    fee:
                        config.fee,

                    totalPayable:
                        totalPayable,

                    rate:
                        currentRate,

                    beneficiary:
                        selectedBeneficiary,

                    createdAt:
                        new Date().toISOString()

                };


                sessionStorage.setItem(
                    "oigr_transfer_review",
                    JSON.stringify(
                        reviewData
                    )
                );


                /*
                 * Review page will be connected
                 * in the next development stage.
                 */

                alert(
                    "Transfer details saved. Review screen will be connected next."
                );

            }
        );

    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    loadStoredBeneficiaries();


    // Attach click listeners to server-rendered beneficiaries
    if (beneficiarySelector) {

        const options =
            beneficiarySelector.querySelectorAll(
                ".beneficiary-option"
            );


        options.forEach(option => {

            option.addEventListener(
                "click",
                () => selectBeneficiary(option)
            );

        });

    }


    // Set initial direction
    setDirection(
        "INR_NPR"
    );


    // Make sure icons are rendered
    if (
        typeof lucide !== "undefined" &&
        lucide.createIcons
    ) {

        lucide.createIcons();

    }

});