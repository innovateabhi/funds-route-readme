document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    // -----------------------------------------------------
    // Direction
    // -----------------------------------------------------

    const directionIndiaNepal =
        document.getElementById("directionIndiaNepal");

    const directionNepalIndia =
        document.getElementById("directionNepalIndia");

    const directionSwitch =
        document.getElementById("directionSwitch");


    // -----------------------------------------------------
    // Transfer Details
    // -----------------------------------------------------

    const transferDetailsTitle =
        document.getElementById("transferDetailsTitle");

    const transferDetailsDescription =
        document.getElementById("transferDetailsDescription");

    const transferRouteHint =
        document.getElementById("transferRouteHint");


    // -----------------------------------------------------
    // Beneficiaries
    // -----------------------------------------------------

    const beneficiarySelector =
        document.getElementById("beneficiarySelector");

    const beneficiaryEmpty =
        document.getElementById("beneficiaryEmpty");

    const addBeneficiaryButton =
        document.getElementById("addBeneficiaryButton");

    const emptyAddBeneficiaryButton =
        document.getElementById("emptyAddBeneficiaryButton");


    // -----------------------------------------------------
    // Amount
    // -----------------------------------------------------

    const sendMoneyFlag =
        document.getElementById("sendMoneyFlag");

    const sendMoneyCurrency =
        document.getElementById("sendMoneyCurrency");

    const sendMoneyCurrencyName =
        document.getElementById("sendMoneyCurrencyName");

    const sendMoneyAmount =
        document.getElementById("sendMoneyAmount");


    // -----------------------------------------------------
    // Recipient Preview
    // -----------------------------------------------------

    const sendMoneyRecipientAmount =
        document.getElementById("sendMoneyRecipientAmount");

    const sendMoneyRecipientCurrency =
        document.getElementById("sendMoneyRecipientCurrency");


    // -----------------------------------------------------
    // Step 1 Summary
    // -----------------------------------------------------

    const sendMoneyRate =
        document.getElementById("sendMoneyRate");

    const sendMoneyFee =
        document.getElementById("sendMoneyFee");

    const sendMoneyTotal =
        document.getElementById("sendMoneyTotal");

    const sendMoneyContinue =
        document.getElementById("sendMoneyContinue");


    // -----------------------------------------------------
    // Step 1 Overview
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // Step Panels
    // -----------------------------------------------------

    const sendMoneyStep1 =
        document.getElementById("sendMoneyStep1");

    const sendMoneyStep2 =
        document.getElementById("sendMoneyStep2");

    const sendMoneyStep3 =
        document.getElementById("sendMoneyStep3");

    const sendMoneySuccess =
        document.getElementById("sendMoneySuccess");


    // -----------------------------------------------------
    // Step Indicators
    // -----------------------------------------------------

    const transferStep1 =
        document.getElementById("transferStep1");

    const transferStep2 =
        document.getElementById("transferStep2");

    const transferStep3 =
        document.getElementById("transferStep3");


    // -----------------------------------------------------
    // STEP 2 - Review
    // -----------------------------------------------------

    const reviewSendFlag =
        document.getElementById("reviewSendFlag");

    const reviewSendCountry =
        document.getElementById("reviewSendCountry");

    const reviewSendCurrency =
        document.getElementById("reviewSendCurrency");

    const reviewReceiveFlag =
        document.getElementById("reviewReceiveFlag");

    const reviewReceiveCountry =
        document.getElementById("reviewReceiveCountry");

    const reviewReceiveCurrency =
        document.getElementById("reviewReceiveCurrency");


    const reviewBeneficiaryAvatar =
        document.getElementById("reviewBeneficiaryAvatar");

    const reviewBeneficiaryName =
        document.getElementById("reviewBeneficiaryName");

    const reviewBeneficiaryBank =
        document.getElementById("reviewBeneficiaryBank");


    const reviewSendAmount =
        document.getElementById("reviewSendAmount");

    const reviewRate =
        document.getElementById("reviewRate");

    const reviewReceiveAmount =
        document.getElementById("reviewReceiveAmount");


    const reviewPaymentAmount =
        document.getElementById("reviewPaymentAmount");

    const reviewPaymentFee =
        document.getElementById("reviewPaymentFee");

    const reviewPaymentTotal =
        document.getElementById("reviewPaymentTotal");


    // -----------------------------------------------------
    // STEP 2 - Side Summary
    // -----------------------------------------------------

    const reviewSideSendFlag =
        document.getElementById("reviewSideSendFlag");

    const reviewSideRoute =
        document.getElementById("reviewSideRoute");

    const reviewSideReceiveFlag =
        document.getElementById("reviewSideReceiveFlag");

    const reviewSideBeneficiaryAvatar =
        document.getElementById("reviewSideBeneficiaryAvatar");

    const reviewSideBeneficiary =
        document.getElementById("reviewSideBeneficiary");

    const reviewSideBank =
        document.getElementById("reviewSideBank");

    const reviewSideTotal =
        document.getElementById("reviewSideTotal");


    // -----------------------------------------------------
    // STEP 2 Actions
    // -----------------------------------------------------

    const backToDetailsButton =
        document.getElementById("backToDetailsButton");

    const proceedToConfirmButton =
        document.getElementById("proceedToConfirmButton");


    // -----------------------------------------------------
    // STEP 3 - Confirm
    // -----------------------------------------------------

    const confirmTotal =
        document.getElementById("confirmTotal");

    const confirmRoute =
        document.getElementById("confirmRoute");

    const confirmBeneficiaryAvatar =
        document.getElementById("confirmBeneficiaryAvatar");

    const confirmBeneficiaryName =
        document.getElementById("confirmBeneficiaryName");

    const confirmBeneficiaryBank =
        document.getElementById("confirmBeneficiaryBank");

    const confirmSendAmount =
        document.getElementById("confirmSendAmount");

    const confirmReceiveAmount =
        document.getElementById("confirmReceiveAmount");

    const confirmRate =
        document.getElementById("confirmRate");

    const confirmFee =
        document.getElementById("confirmFee");


    const confirmTransferCheckbox =
        document.getElementById("confirmTransferCheckbox");

    const confirmError =
        document.getElementById("confirmError");

    const backToReviewButton =
        document.getElementById("backToReviewButton");

    const confirmTransferButton =
        document.getElementById("confirmTransferButton");


    // -----------------------------------------------------
    // SUCCESS
    // -----------------------------------------------------

    const successTransactionId =
        document.getElementById("successTransactionId");

    const successSendFlag =
        document.getElementById("successSendFlag");

    const successSendCountry =
        document.getElementById("successSendCountry");

    const successSendCurrency =
        document.getElementById("successSendCurrency");

    const successReceiveFlag =
        document.getElementById("successReceiveFlag");

    const successReceiveCountry =
        document.getElementById("successReceiveCountry");

    const successReceiveCurrency =
        document.getElementById("successReceiveCurrency");

    const successSendAmount =
        document.getElementById("successSendAmount");

    const successReceiveAmount =
        document.getElementById("successReceiveAmount");

    const newTransferButton =
        document.getElementById("newTransferButton");


    // -----------------------------------------------------
    // Modal
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // Backend Rate Data
    // -----------------------------------------------------

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

    let currentReviewData = null;


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


    function maskAccount(account) {

        const value =
            String(account ?? "").trim();

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
       TRANSFER STEP MANAGEMENT
    ===================================================== */

    function hideAllTransferPanels() {

        if (sendMoneyStep1) {
            sendMoneyStep1.hidden = true;
        }

        if (sendMoneyStep2) {
            sendMoneyStep2.hidden = true;
        }

        if (sendMoneyStep3) {
            sendMoneyStep3.hidden = true;
        }

        if (sendMoneySuccess) {
            sendMoneySuccess.hidden = true;
        }

    }


    function updateStepIndicators(activeStep) {

        const steps = [
            {
                element: transferStep1,
                number: 1
            },
            {
                element: transferStep2,
                number: 2
            },
            {
                element: transferStep3,
                number: 3
            }
        ];


        steps.forEach(step => {

            if (!step.element) {
                return;
            }

            step.element.classList.remove(
                "active",
                "completed"
            );


            if (step.number === activeStep) {

                step.element.classList.add(
                    "active"
                );

            } else if (step.number < activeStep) {

                step.element.classList.add(
                    "completed"
                );

            }

        });

    }


    function showStep1() {

        hideAllTransferPanels();

        if (sendMoneyStep1) {
            sendMoneyStep1.hidden = false;
        }

        updateStepIndicators(1);

        clearConfirmError();

        refreshIcons();

    }


    function showStep2() {

        hideAllTransferPanels();

        if (sendMoneyStep2) {
            sendMoneyStep2.hidden = false;
        }

        updateStepIndicators(2);

        refreshIcons();

    }


    function showStep3() {

        hideAllTransferPanels();

        if (sendMoneyStep3) {
            sendMoneyStep3.hidden = false;
        }

        updateStepIndicators(3);

        clearConfirmError();

        refreshIcons();

    }


    function showSuccess() {

        hideAllTransferPanels();

        if (sendMoneySuccess) {
            sendMoneySuccess.hidden = false;
        }

        updateStepIndicators(3);

        refreshIcons();

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

        if (
            !directionIndiaNepal ||
            !directionNepalIndia
        ) {
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
                formatMoney(
                    config.fee,
                    config.sendCurrency
                );

        }


        if (overviewFee) {

            overviewFee.textContent =
                formatMoney(
                    config.fee,
                    config.sendCurrency
                );

        }

    }


    /* =====================================================
       UPDATE OVERVIEW BENEFICIARY
    ===================================================== */

    function updateOverviewBeneficiary() {

        if (!selectedBeneficiary) {

            if (overviewBeneficiaryAvatar) {

                overviewBeneficiaryAvatar.textContent =
                    "?";

            }

            if (overviewBeneficiaryName) {

                overviewBeneficiaryName.textContent =
                    "No beneficiary selected";

            }

            if (overviewBeneficiaryBank) {

                overviewBeneficiaryBank.textContent =
                    "Add a recipient to continue";

            }

            return;

        }


        if (overviewBeneficiaryAvatar) {

            overviewBeneficiaryAvatar.textContent =
                String(
                    selectedBeneficiary.name || "?"
                )
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
                maskAccount(
                    selectedBeneficiary.account
                );

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


        const config =
            getConfig();


        const options =
            Array.from(
                beneficiarySelector.querySelectorAll(
                    ".beneficiary-option"
                )
            );


        let visibleCount = 0;


        options.forEach(option => {

            const country =
                option.dataset.country || "";


            const matches =
                country.toLowerCase() ===
                config.receiveCountry.toLowerCase();


            option.hidden =
                !matches;


            if (!matches) {

                option.classList.remove(
                    "active"
                );

            }


            if (matches) {
                visibleCount++;
            }

        });


        if (beneficiaryEmpty) {

            beneficiaryEmpty.hidden =
                visibleCount !== 0;

        }


        /*
         * Do not automatically select the first
         * beneficiary when the direction changes.
         *
         * The user should explicitly select one.
         */

        const currentMatches =
            selectedBeneficiary &&
            selectedBeneficiary.country &&
            selectedBeneficiary.country.toLowerCase() ===
            config.receiveCountry.toLowerCase();


        if (!currentMatches) {

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


        const config =
            getConfig();


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

            item.classList.remove(
                "active"
            );

        });


        option.classList.add(
            "active"
        );


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


        if (
            !Array.isArray(stored) ||
            !beneficiarySelector
        ) {
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


        const config =
            getConfig();


        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            "beneficiary-option";


        button.dataset.beneficiary =
            beneficiary.id ||
            `local-${Date.now()}`;


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
            beneficiary.name ||
            "Beneficiary";


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
            maskAccount(
                beneficiary.account
            );


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


        check.appendChild(
            checkIcon
        );


        button.appendChild(
            avatar
        );

        button.appendChild(
            details
        );

        button.appendChild(
            account
        );

        button.appendChild(
            check
        );


        beneficiarySelector.appendChild(
            button
        );


        button.addEventListener(
            "click",
            () => selectBeneficiary(button)
        );


        refreshIcons();


        if (
            selectAfterAdd &&
            beneficiary.country ===
            config.receiveCountry
        ) {

            selectBeneficiary(
                button
            );

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


        stored.push(
            beneficiary
        );


        localStorage.setItem(
            "oigr_beneficiaries",
            JSON.stringify(stored)
        );

    }


    /* =====================================================
       MODAL
    ===================================================== */

    function updateModalForDirection() {

        const config =
            getConfig();


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

            beneficiaryFormError.hidden =
                true;

            beneficiaryFormError.textContent =
                "";

        }


        beneficiaryModal.hidden =
            false;


        document.body.classList.add(
            "modal-open"
        );


        setTimeout(() => {

            if (beneficiaryName) {
                beneficiaryName.focus();
            }

        }, 50);


        refreshIcons();

    }


    function closeBeneficiaryModal() {

        if (!beneficiaryModal) {
            return;
        }


        beneficiaryModal.hidden =
            true;


        document.body.classList.remove(
            "modal-open"
        );


        if (beneficiaryForm) {
            beneficiaryForm.reset();
        }


        if (beneficiaryFormError) {

            beneficiaryFormError.hidden =
                true;

            beneficiaryFormError.textContent =
                "";

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


                const config =
                    getConfig();


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

    function extractRate(
        data,
        currency
    ) {

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


        if (
            data[currency] !== undefined
        ) {

            const value =
                parseFloat(
                    data[currency]
                );


            return Number.isFinite(value)
                ? value
                : null;

        }


        if (
            data.rate !== undefined
        ) {

            const value =
                parseFloat(
                    data.rate
                );


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

        const config =
            getConfig();


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

        const config =
            getConfig();


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

        const config =
            getConfig();


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
                    formatMoney(
                        config.fee,
                        config.sendCurrency
                    );

            }


            if (overviewTotal) {

                overviewTotal.textContent =
                    formatMoney(
                        config.fee,
                        config.sendCurrency
                    );

            }


            return;

        }


        const receivedAmount =
            amount * currentRate;


        const totalPayable =
            amount + config.fee;


        // -------------------------------------------------
        // Recipient preview
        // -------------------------------------------------

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


        // -------------------------------------------------
        // Summary
        // -------------------------------------------------

        if (sendMoneyFee) {

            sendMoneyFee.textContent =
                formatMoney(
                    config.fee,
                    config.sendCurrency
                );

        }


        if (sendMoneyTotal) {

            sendMoneyTotal.textContent =
                formatMoney(
                    totalPayable,
                    config.sendCurrency
                );

        }


        // -------------------------------------------------
        // Overview
        // -------------------------------------------------

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
                formatMoney(
                    config.fee,
                    config.sendCurrency
                );

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
       BUILD REVIEW DATA
    ===================================================== */

    function buildReviewData() {

        const config =
            getConfig();


        const amount =
            parseFloat(
                sendMoneyAmount?.value || "0"
            );


        const receivedAmount =
            amount * currentRate;


        const totalPayable =
            amount + config.fee;


        return {

            direction:
                direction,

            sendCountry:
                config.sendCountry,

            sendCurrency:
                config.sendCurrency,

            sendFlag:
                config.sendFlag,

            receiveCountry:
                config.receiveCountry,

            receiveCurrency:
                config.receiveCurrency,

            receiveFlag:
                config.receiveFlag,

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

    }


    /* =====================================================
       POPULATE STEP 2 REVIEW
    ===================================================== */

    function populateReview(data) {

        if (!data) {
            return;
        }


        // -------------------------------------------------
        // Route
        // -------------------------------------------------

        if (reviewSendFlag) {

            reviewSendFlag.textContent =
                data.sendFlag;

        }


        if (reviewSendCountry) {

            reviewSendCountry.textContent =
                data.sendCountry;

        }


        if (reviewSendCurrency) {

            reviewSendCurrency.textContent =
                data.sendCurrency;

        }


        if (reviewReceiveFlag) {

            reviewReceiveFlag.textContent =
                data.receiveFlag;

        }


        if (reviewReceiveCountry) {

            reviewReceiveCountry.textContent =
                data.receiveCountry;

        }


        if (reviewReceiveCurrency) {

            reviewReceiveCurrency.textContent =
                data.receiveCurrency;

        }


        // -------------------------------------------------
        // Beneficiary
        // -------------------------------------------------

        const beneficiary =
            data.beneficiary;


        if (beneficiary) {

            const firstLetter =
                String(
                    beneficiary.name || "?"
                )
                .trim()
                .charAt(0)
                .toUpperCase();


            if (reviewBeneficiaryAvatar) {

                reviewBeneficiaryAvatar.textContent =
                    firstLetter;

            }


            if (reviewBeneficiaryName) {

                reviewBeneficiaryName.textContent =
                    beneficiary.name || "Beneficiary";

            }


            if (reviewBeneficiaryBank) {

                reviewBeneficiaryBank.textContent =
                    `${beneficiary.bank || "Bank"} · ${maskAccount(
                        beneficiary.account
                    )}`;

            }

        }


        // -------------------------------------------------
        // Transfer Amount
        // -------------------------------------------------

        if (reviewSendAmount) {

            reviewSendAmount.textContent =
                formatMoney(
                    data.amount,
                    data.sendCurrency
                );

        }


        if (reviewRate) {

            reviewRate.textContent =
                `1 ${data.sendCurrency} = ${Number(
                    data.rate
                ).toLocaleString(
                    "en-IN",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4
                    }
                )} ${data.receiveCurrency}`;

        }


        if (reviewReceiveAmount) {

            reviewReceiveAmount.textContent =
                formatMoney(
                    data.receivedAmount,
                    data.receiveCurrency
                );

        }


        // -------------------------------------------------
        // Payment Summary
        // -------------------------------------------------

        if (reviewPaymentAmount) {

            reviewPaymentAmount.textContent =
                formatMoney(
                    data.amount,
                    data.sendCurrency
                );

        }


        if (reviewPaymentFee) {

            reviewPaymentFee.textContent =
                formatMoney(
                    data.fee,
                    data.sendCurrency
                );

        }


        if (reviewPaymentTotal) {

            reviewPaymentTotal.textContent =
                formatMoney(
                    data.totalPayable,
                    data.sendCurrency
                );

        }


        // -------------------------------------------------
        // Side Summary
        // -------------------------------------------------

        if (reviewSideSendFlag) {

            reviewSideSendFlag.textContent =
                data.sendFlag;

        }


        if (reviewSideRoute) {

            reviewSideRoute.textContent =
                `${data.sendCountry} → ${data.receiveCountry}`;

        }


        if (reviewSideReceiveFlag) {

            reviewSideReceiveFlag.textContent =
                data.receiveFlag;

        }


        if (reviewSideBeneficiaryAvatar) {

            reviewSideBeneficiaryAvatar.textContent =
                beneficiary
                    ? String(
                        beneficiary.name || "?"
                    )
                    .trim()
                    .charAt(0)
                    .toUpperCase()
                    : "?";

        }


        if (reviewSideBeneficiary) {

            reviewSideBeneficiary.textContent =
                beneficiary?.name ||
                "No beneficiary";

        }


        if (reviewSideBank) {

            reviewSideBank.textContent =
                beneficiary
                    ? `${beneficiary.bank || "Bank"} · ${maskAccount(
                        beneficiary.account
                    )}`
                    : "—";

        }


        if (reviewSideTotal) {

            reviewSideTotal.textContent =
                formatMoney(
                    data.totalPayable,
                    data.sendCurrency
                );

        }

    }


    /* =====================================================
       POPULATE STEP 3 CONFIRMATION
    ===================================================== */

    function populateConfirmation(data) {

        if (!data) {
            return;
        }


        const beneficiary =
            data.beneficiary;


        // -------------------------------------------------
        // Total
        // -------------------------------------------------

        if (confirmTotal) {

            confirmTotal.textContent =
                formatMoney(
                    data.totalPayable,
                    data.sendCurrency
                );

        }


        // -------------------------------------------------
        // Route
        // -------------------------------------------------

        if (confirmRoute) {

            confirmRoute.textContent =
                `${data.sendCountry} → ${data.receiveCountry}`;

        }


        // -------------------------------------------------
        // Beneficiary
        // -------------------------------------------------

        if (confirmBeneficiaryAvatar) {

            confirmBeneficiaryAvatar.textContent =
                beneficiary
                    ? String(
                        beneficiary.name || "?"
                    )
                    .trim()
                    .charAt(0)
                    .toUpperCase()
                    : "?";

        }


        if (confirmBeneficiaryName) {

            confirmBeneficiaryName.textContent =
                beneficiary?.name ||
                "Beneficiary";

        }


        if (confirmBeneficiaryBank) {

            confirmBeneficiaryBank.textContent =
                beneficiary
                    ? `${beneficiary.bank || "Bank"} · ${maskAccount(
                        beneficiary.account
                    )}`
                    : "—";

        }


        // -------------------------------------------------
        // Values
        // -------------------------------------------------

        if (confirmSendAmount) {

            confirmSendAmount.textContent =
                formatMoney(
                    data.amount,
                    data.sendCurrency
                );

        }


        if (confirmReceiveAmount) {

            confirmReceiveAmount.textContent =
                formatMoney(
                    data.receivedAmount,
                    data.receiveCurrency
                );

        }


        if (confirmRate) {

            confirmRate.textContent =
                `1 ${data.sendCurrency} = ${Number(
                    data.rate
                ).toLocaleString(
                    "en-IN",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4
                    }
                )} ${data.receiveCurrency}`;

        }


        if (confirmFee) {

            confirmFee.textContent =
                formatMoney(
                    data.fee,
                    data.sendCurrency
                );

        }

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


                // -------------------------------------------------
                // Validate amount
                // -------------------------------------------------

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


                // -------------------------------------------------
                // Validate beneficiary
                // -------------------------------------------------

                if (!selectedBeneficiary) {

                    alert(
                        `Please select a ${config.receiveCountry} beneficiary before continuing.`
                    );

                    return;

                }


                // -------------------------------------------------
                // Validate rate
                // -------------------------------------------------

                if (
                    currentRate === null ||
                    !Number.isFinite(currentRate)
                ) {

                    alert(
                        "The exchange rate is currently unavailable. Please try again."
                    );

                    return;

                }


                // -------------------------------------------------
                // Build review data
                // -------------------------------------------------

                currentReviewData =
                    buildReviewData();


                // -------------------------------------------------
                // Save to session storage
                // -------------------------------------------------

                try {

                    sessionStorage.setItem(
                        "oigr_transfer_review",
                        JSON.stringify(
                            currentReviewData
                        )
                    );

                } catch (error) {

                    console.warn(
                        "Unable to save transfer review data:",
                        error
                    );

                }


                // -------------------------------------------------
                // Populate Step 2
                // -------------------------------------------------

                populateReview(
                    currentReviewData
                );


                // -------------------------------------------------
                // Open Step 2
                // -------------------------------------------------

                showStep2();

            }
        );

    }


    /* =====================================================
       BACK TO DETAILS
    ===================================================== */

    if (backToDetailsButton) {

        backToDetailsButton.addEventListener(
            "click",
            () => {

                showStep1();

            }
        );

    }


    /* =====================================================
       PROCEED TO CONFIRM
    ===================================================== */

    if (proceedToConfirmButton) {

        proceedToConfirmButton.addEventListener(
            "click",
            () => {

                if (!currentReviewData) {

                    try {

                        const stored =
                            sessionStorage.getItem(
                                "oigr_transfer_review"
                            );


                        if (stored) {

                            currentReviewData =
                                JSON.parse(stored);

                        }

                    } catch (error) {

                        currentReviewData =
                            null;

                    }

                }


                if (!currentReviewData) {

                    alert(
                        "Transfer review information is missing. Please return to the transfer details."
                    );

                    showStep1();

                    return;

                }


                populateConfirmation(
                    currentReviewData
                );


                // Reset checkbox every time Step 3 opens

                if (confirmTransferCheckbox) {

                    confirmTransferCheckbox.checked =
                        false;

                }


                if (confirmTransferButton) {

                    confirmTransferButton.disabled =
                        true;

                }


                clearConfirmError();

                showStep3();

            }
        );

    }


    /* =====================================================
       BACK TO REVIEW
    ===================================================== */

    if (backToReviewButton) {

        backToReviewButton.addEventListener(
            "click",
            () => {

                showStep2();

            }
        );

    }


    /* =====================================================
       CONFIRMATION CHECKBOX
    ===================================================== */

    if (confirmTransferCheckbox) {

        confirmTransferCheckbox.addEventListener(
            "change",
            () => {

                if (confirmTransferButton) {

                    confirmTransferButton.disabled =
                        !confirmTransferCheckbox.checked;

                }


                if (confirmTransferCheckbox.checked) {

                    clearConfirmError();

                }

            }
        );

    }


    /* =====================================================
       CONFIRM TRANSFER
    ===================================================== */

    if (confirmTransferButton) {

        confirmTransferButton.addEventListener(
            "click",
            () => {

                // -------------------------------------------------
                // Validate checkbox
                // -------------------------------------------------

                if (
                    !confirmTransferCheckbox ||
                    !confirmTransferCheckbox.checked
                ) {

                    showConfirmError(
                        "Please confirm that the transfer details are correct before proceeding."
                    );

                    return;

                }


                // -------------------------------------------------
                // Validate review data
                // -------------------------------------------------

                if (!currentReviewData) {

                    showConfirmError(
                        "Transfer information is unavailable. Please return to the review step."
                    );

                    return;

                }


                // -------------------------------------------------
                // Generate prototype transaction reference
                // -------------------------------------------------

                const transactionId =
                    generateTransactionId();


                // -------------------------------------------------
                // Populate success screen
                // -------------------------------------------------

                populateSuccess(
                    currentReviewData,
                    transactionId
                );


                // -------------------------------------------------
                // Clear temporary confirmation state
                // -------------------------------------------------

                try {

                    sessionStorage.removeItem(
                        "oigr_transfer_review"
                    );

                } catch (error) {

                    console.warn(
                        "Unable to clear transfer review data:",
                        error
                    );

                }


                // -------------------------------------------------
                // Show success
                // -------------------------------------------------

                showSuccess();

            }
        );

    }


    /* =====================================================
       CONFIRM ERROR
    ===================================================== */

    function showConfirmError(message) {

        if (!confirmError) {
            return;
        }


        confirmError.textContent =
            message;


        confirmError.hidden =
            false;

    }


    function clearConfirmError() {

        if (!confirmError) {
            return;
        }


        confirmError.textContent =
            "";


        confirmError.hidden =
            true;

    }


    /* =====================================================
       GENERATE TRANSACTION ID
    ===================================================== */

    function generateTransactionId() {

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                "0"
            );


        const random =
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        return `OIGR-${year}${month}${day}-${random}`;

    }


    /* =====================================================
       POPULATE SUCCESS SCREEN
    ===================================================== */

    function populateSuccess(
        data,
        transactionId
    ) {

        if (!data) {
            return;
        }


        if (successTransactionId) {

            successTransactionId.textContent =
                transactionId;

        }


        if (successSendFlag) {

            successSendFlag.textContent =
                data.sendFlag;

        }


        if (successSendCountry) {

            successSendCountry.textContent =
                data.sendCountry;

        }


        if (successSendCurrency) {

            successSendCurrency.textContent =
                data.sendCurrency;

        }


        if (successReceiveFlag) {

            successReceiveFlag.textContent =
                data.receiveFlag;

        }


        if (successReceiveCountry) {

            successReceiveCountry.textContent =
                data.receiveCountry;

        }


        if (successReceiveCurrency) {

            successReceiveCurrency.textContent =
                data.receiveCurrency;

        }


        if (successSendAmount) {

            successSendAmount.textContent =
                formatMoney(
                    data.amount,
                    data.sendCurrency
                );

        }


        if (successReceiveAmount) {

            successReceiveAmount.textContent =
                formatMoney(
                    data.receivedAmount,
                    data.receiveCurrency
                );

        }

    }


    /* =====================================================
       START NEW TRANSFER
    ===================================================== */

    if (newTransferButton) {

        newTransferButton.addEventListener(
            "click",
            () => {

                // Reset amount

                if (sendMoneyAmount) {

                    sendMoneyAmount.value =
                        "";

                }


                // Reset beneficiary

                selectedBeneficiary =
                    null;


                if (beneficiarySelector) {

                    const options =
                        beneficiarySelector.querySelectorAll(
                            ".beneficiary-option"
                        );


                    options.forEach(option => {

                        option.classList.remove(
                            "active"
                        );

                    });

                }


                // Reset confirmation

                if (confirmTransferCheckbox) {

                    confirmTransferCheckbox.checked =
                        false;

                }


                if (confirmTransferButton) {

                    confirmTransferButton.disabled =
                        true;

                }


                currentReviewData =
                    null;


                try {

                    sessionStorage.removeItem(
                        "oigr_transfer_review"
                    );

                } catch (error) {

                    console.warn(
                        "Unable to clear session storage:",
                        error
                    );

                }


                updateOverviewBeneficiary();

                calculateTransfer();

                showStep1();

            }
        );

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


        // -------------------------------------------------
        // Set initial rate
        // -------------------------------------------------

        if (direction === "INR_NPR") {

            currentRate =
                initialInrToNpr;

        } else {

            currentRate =
                initialNprToInr;

        }


        // -------------------------------------------------
        // Update UI
        // -------------------------------------------------

        updateTransferDetails();

        updateRouteHint();

        updateDirectionButtons();

        updateSendingCurrency();

        updateRecipientCurrency();

        updateOverviewRoute();

        updateFee();

        updateModalForDirection();


        // -------------------------------------------------
        // Beneficiaries
        // -------------------------------------------------

        filterBeneficiaries();


        // -------------------------------------------------
        // Calculate
        // -------------------------------------------------

        calculateTransfer();


        // -------------------------------------------------
        // Refresh live rate
        // -------------------------------------------------

        fetchLiveRate();


        refreshIcons();

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
       TWO-WAY SWITCH
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


                selectBeneficiary(
                    option
                );

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
       LUCIDE ICON REFRESH
    ===================================================== */

    function refreshIcons() {

        if (
            typeof lucide !== "undefined" &&
            lucide.createIcons
        ) {

            lucide.createIcons();

        }

    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    loadStoredBeneficiaries();


    // -----------------------------------------------------
    // Attach listeners to server-rendered beneficiaries
    // -----------------------------------------------------

    if (beneficiarySelector) {

        const options =
            beneficiarySelector.querySelectorAll(
                ".beneficiary-option"
            );


        options.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    selectBeneficiary(
                        option
                    );

                }
            );

        });

    }


    // -----------------------------------------------------
    // Initial direction
    // -----------------------------------------------------

    setDirection(
        "INR_NPR"
    );


    // -----------------------------------------------------
    // Initial panel
    // -----------------------------------------------------

    showStep1();


    // -----------------------------------------------------
    // Render icons
    // -----------------------------------------------------

    refreshIcons();

});