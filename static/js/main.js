document.addEventListener("DOMContentLoaded", function () {

    /*
    =============================
    Initialize Lucide Icons
    =============================
    */

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }


    /*
    =============================
    Sidebar
    =============================
    */

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const sidebarClose =
        document.getElementById("sidebarClose");


    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        sidebarOverlay?.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        sidebarOverlay?.classList.remove("show");

        document.body.style.overflow =
            "";

    }


    mobileMenuButton?.addEventListener(
        "click",
        openSidebar
    );


    sidebarClose?.addEventListener(
        "click",
        closeSidebar
    );


    sidebarOverlay?.addEventListener(
        "click",
        closeSidebar
    );


    /*
    =============================
    Profile Dropdown
    =============================
    */

    const profileTrigger =
        document.getElementById("profileTrigger");

    const profileDropdown =
        document.getElementById("profileDropdown");


    profileTrigger?.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            profileDropdown?.classList.toggle(
                "open"
            );

        }
    );


    document.addEventListener(
        "click",
        function () {

            profileDropdown?.classList.remove(
                "open"
            );

        }
    );

});