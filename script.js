/* =========================================
   SIPWISE - COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   CUSTOMER DEMO DATABASE
========================================= */

const customers = [
    {
        id: "CUST1001",
        phone: "9876543210",
        salary: 85000,
        age: 32,
        propensity: "high",
        score: 94,
        invested: false
    },
    {
        id: "CUST1002",
        phone: "9823456710",
        salary: 72000,
        age: 29,
        propensity: "high",
        score: 89,
        invested: false
    },
    {
        id: "CUST1003",
        phone: "9912345678",
        salary: 95000,
        age: 38,
        propensity: "high",
        score: 87,
        invested: true
    },
    {
        id: "CUST1004",
        phone: "9765432189",
        salary: 65000,
        age: 31,
        propensity: "high",
        score: 84,
        invested: false
    },
    {
        id: "CUST1005",
        phone: "9988776655",
        salary: 78000,
        age: 35,
        propensity: "high",
        score: 81,
        invested: true
    },
    {
        id: "CUST1006",
        phone: "9876123456",
        salary: 55000,
        age: 27,
        propensity: "medium",
        score: 74,
        invested: false
    },
    {
        id: "CUST1007",
        phone: "9812345670",
        salary: 62000,
        age: 30,
        propensity: "medium",
        score: 71,
        invested: false
    },
    {
        id: "CUST1008",
        phone: "9765123489",
        salary: 58000,
        age: 26,
        propensity: "medium",
        score: 68,
        invested: true
    },
    {
        id: "CUST1009",
        phone: "9988123456",
        salary: 70000,
        age: 34,
        propensity: "medium",
        score: 65,
        invested: false
    },
    {
        id: "CUST1010",
        phone: "9898989898",
        salary: 48000,
        age: 24,
        propensity: "low",
        score: 49,
        invested: false
    },
    {
        id: "CUST1011",
        phone: "9753124680",
        salary: 42000,
        age: 23,
        propensity: "low",
        score: 41,
        invested: false
    },
    {
        id: "CUST1012",
        phone: "9998887776",
        salary: 39000,
        age: 25,
        propensity: "low",
        score: 35,
        invested: false
    }
];


/* =========================================
   APPLICATION STATE
========================================= */

let currentFilter = "high";
let currentSearch = "";
let selectedBranch = "";
let isLoggedIn = false;


/* =========================================
   DOM ELEMENTS
========================================= */

const loginPage = document.getElementById("loginPage");
const app = document.getElementById("app");

const loginForm = document.getElementById("loginForm");
const branchSelect = document.getElementById("branch");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");
const showPasswordButton = document.getElementById("showPassword");

const currentBranch = document.getElementById("currentBranch");
const topBranchName = document.getElementById("topBranchName");

const logoutButton = document.getElementById("logoutButton");
const themeToggle = document.getElementById("themeToggle");
const settingsThemeToggle = document.getElementById("settingsThemeToggle");

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const showAllButton = document.getElementById("showAllButton");
const viewCustomersButton = document.getElementById("viewCustomersButton");
const backToHighButton = document.getElementById("backToHighButton");

const customerSearch = document.getElementById("customerSearch");
const filterButtons = document.querySelectorAll(".filter-button");

const dashboardCustomersBody = document.getElementById("dashboardCustomersBody");
const customersTableBody = document.getElementById("customersTableBody");

const customerResultCount = document.getElementById("customerResultCount");

const totalCustomers = document.getElementById("totalCustomers");
const highCustomers = document.getElementById("highCustomers");
const mediumCustomers = document.getElementById("mediumCustomers");
const lowCustomers = document.getElementById("lowCustomers");

const dashboardTableTitle = document.getElementById("dashboardTableTitle");
const dashboardTableDescription = document.getElementById(
    "dashboardTableDescription"
);

const averageScore = document.getElementById("averageScore");
const highRate = document.getElementById("highRate");
const mediumRate = document.getElementById("mediumRate");
const lowRate = document.getElementById("lowRate");

const highDistributionText = document.getElementById(
    "highDistributionText"
);

const mediumDistributionText = document.getElementById(
    "mediumDistributionText"
);

const lowDistributionText = document.getElementById(
    "lowDistributionText"
);

const highProgress = document.getElementById("highProgress");
const mediumProgress = document.getElementById("mediumProgress");
const lowProgress = document.getElementById("lowProgress");


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

showPasswordButton.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showPasswordButton.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        showPasswordButton.textContent = "Show";

    }

});


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const branch = branchSelect.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    if (!branch || !email || !password) {

        loginMessage.textContent =
            "Please enter branch, bank email and password.";

        return;

    }


    /* Demo frontend login validation */

    if (!email.includes("@") || password.length < 4) {

        loginMessage.textContent =
            "Please enter valid login details.";

        return;

    }


    selectedBranch = branch;
    isLoggedIn = true;

    loginMessage.textContent = "";

    currentBranch.textContent = selectedBranch;
    topBranchName.textContent = selectedBranch;

    loginPage.classList.add("hidden");
    app.classList.remove("hidden");


    /* Dashboard default = HIGH PROPENSITY */

    currentFilter = "high";
    currentSearch = "";

    if (customerSearch) {
        customerSearch.value = "";
    }

    updateFilterButtons();
    renderEverything();

});


/* =========================================
   LOGOUT
========================================= */

logoutButton.addEventListener("click", function () {

    isLoggedIn = false;
    selectedBranch = "";

    app.classList.add("hidden");
    loginPage.classList.remove("hidden");

    loginForm.reset();

    loginMessage.textContent = "";

    passwordInput.type = "password";
    showPasswordButton.textContent = "Show";

});


/* =========================================
   PAGE NAVIGATION
========================================= */

const pageInformation = {

    dashboard: {
        title: "Dashboard",
        subtitle: "SIP propensity overview for your branch."
    },

    customers: {
        title: "Customers",
        subtitle: "Search and manage branch customer propensity data."
    },

    analytics: {
        title: "Analytics",
        subtitle: "Understand SIP propensity distribution and insights."
    },

    settings: {
        title: "Settings",
        subtitle: "Manage dashboard and prototype preferences."
    }

};


function openPage(pageName) {

    pages.forEach(function (page) {

        page.classList.remove("active-page");

    });


    navItems.forEach(function (item) {

        item.classList.remove("active");

    });


    const selectedPage = document.getElementById(
        pageName + "Page"
    );


    const selectedNavItem = document.querySelector(
        `.nav-item[data-page="${pageName}"]`
    );


    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    if (selectedNavItem) {

        selectedNavItem.classList.add("active");

    }


    if (pageInformation[pageName]) {

        pageTitle.textContent =
            pageInformation[pageName].title;

        pageSubtitle.textContent =
            pageInformation[pageName].subtitle;

    }


    /* Opens page at top on same browser tab */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const pageName = item.dataset.page;

        openPage(pageName);

    });

});


/* =========================================
   DARK MODE
========================================= */

function updateThemeIcon() {

    if (document.body.classList.contains("light-mode")) {

        themeToggle.textContent = "☾";

    } else {

        themeToggle.textContent = "☀";

    }

}


function toggleTheme() {

    document.body.classList.toggle("light-mode");

    updateThemeIcon();

}


themeToggle.addEventListener("click", toggleTheme);


settingsThemeToggle.addEventListener("click", toggleTheme);


/* =========================================
   SHOW ALL ACCOUNTS
========================================= */

showAllButton.addEventListener("click", function () {

    currentFilter = "all";
    currentSearch = "";

    if (customerSearch) {
        customerSearch.value = "";
    }

    updateFilterButtons();
    renderEverything();

    openPage("customers");

});


/* =========================================
   VIEW CUSTOMERS
========================================= */

viewCustomersButton.addEventListener("click", function () {

    currentFilter = "high";
    currentSearch = "";

    if (customerSearch) {
        customerSearch.value = "";
    }

    updateFilterButtons();
    renderEverything();

    openPage("customers");

});


/* =========================================
   SHOW HIGH ONLY
========================================= */

backToHighButton.addEventListener("click", function () {

    currentFilter = "high";
    currentSearch = "";

    customerSearch.value = "";

    updateFilterButtons();
    renderCustomers();

});


/* =========================================
   CUSTOMER SEARCH
========================================= */

customerSearch.addEventListener("input", function () {

    currentSearch = customerSearch.value
        .trim()
        .toLowerCase();

    renderCustomers();

});


/* =========================================
   PROPENSITY FILTERS
========================================= */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;

        updateFilterButtons();

        renderCustomers();

    });

});


function updateFilterButtons() {

    filterButtons.forEach(function (button) {

        button.classList.remove("active-filter");

        if (button.dataset.filter === currentFilter) {

            button.classList.add("active-filter");

        }

    });

}


/* =========================================
   GET FILTERED CUSTOMERS
========================================= */

function getFilteredCustomers() {

    return customers.filter(function (customer) {

        const matchesFilter =
            currentFilter === "all" ||
            customer.propensity === currentFilter;


        const matchesSearch =
            customer.id
                .toLowerCase()
                .includes(currentSearch);


        return matchesFilter && matchesSearch;

    });

}


/* =========================================
   FORMAT SALARY
========================================= */

function formatSalary(salary) {

    return "₹" + salary.toLocaleString("en-IN");

}


/* =========================================
   PROPENSITY BADGE
========================================= */

function getPropensityBadge(propensity) {

    const capitalized =
        propensity.charAt(0).toUpperCase() +
        propensity.slice(1);


    return `
        <span class="propensity-badge badge-${propensity}">
            ${capitalized}
        </span>
    `;

}


/* =========================================
   INVESTMENT STATUS
========================================= */

function getInvestmentStatus(customer) {

    if (customer.invested) {

        return `
            <span class="investment-badge invested-badge">
                Invested
            </span>
        `;

    }


    return `
        <span class="investment-badge not-invested-badge">
            Not Invested
        </span>
    `;

}


/* =========================================
   DASHBOARD TABLE
   PHONE NUMBER IS NEVER SHOWN
========================================= */

function renderDashboardCustomers() {

    const highPropensityCustomers =
        customers.filter(function (customer) {

            return customer.propensity === "high";

        });


    dashboardCustomersBody.innerHTML = "";


    highPropensityCustomers.forEach(function (customer) {

        const row = document.createElement("tr");


        row.innerHTML = `
            <td>${customer.id}</td>

            <td>
                <span class="contact-protected">
                    Protected
                </span>
            </td>

            <td>${formatSalary(customer.salary)}</td>

            <td>${customer.age}</td>

            <td>
                ${getPropensityBadge(customer.propensity)}
            </td>

            <td>
                <span class="score">
                    ${customer.score}
                </span>
            </td>
        `;


        dashboardCustomersBody.appendChild(row);

    });

}


/* =========================================
   FETCH CONTACT NUMBER
   DEMO DATABASE FUNCTION
========================================= */

function fetchCustomerContact(customerId, contactCell, button) {

    const customer = customers.find(function (item) {

        return item.id === customerId;

    });


    if (!customer) {
        return;
    }


    /*
       Contact can only be fetched when:
       1. Customer has HIGH propensity
       2. Customer has NOT invested
    */

    const isAllowed =
        customer.propensity === "high" &&
        customer.invested === false;


    if (!isAllowed) {

        contactCell.innerHTML = `
            <span class="contact-unavailable">
                Not available
            </span>
        `;

        return;

    }


    /* Simulated database retrieval */

    button.textContent = "Fetching...";
    button.disabled = true;


    setTimeout(function () {

        contactCell.innerHTML = `
            <span class="contact-number">
                ${customer.phone}
            </span>
        `;


        button.textContent = "Fetched";
        button.classList.add("revealed");

    }, 500);

}


/* =========================================
   CUSTOMERS TABLE
========================================= */

function renderCustomers() {

    const filteredCustomers =
        getFilteredCustomers();


    customersTableBody.innerHTML = "";


    customerResultCount.textContent =
        `${filteredCustomers.length} account${filteredCustomers.length === 1 ? "" : "s"} found`;


    if (filteredCustomers.length === 0) {

        customersTableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">
                    No customer accounts found.
                </td>
            </tr>
        `;

        return;

    }


    filteredCustomers.forEach(function (customer) {

        const row = document.createElement("tr");


        const canFetchContact =
            customer.propensity === "high" &&
            customer.invested === false;


        const actionContent = canFetchContact

            ? `
                <button
                    class="fetch-contact-button"
                    data-customer-id="${customer.id}"
                >
                    Fetch Contact
                </button>
            `

            : `
                <span class="contact-unavailable">
                    Not available
                </span>
            `;


        row.innerHTML = `
            <td>${customer.id}</td>

            <td>${formatSalary(customer.salary)}</td>

            <td>${customer.age}</td>

            <td>
                ${getPropensityBadge(customer.propensity)}
            </td>

            <td>
                <span class="score">
                    ${customer.score}
                </span>
            </td>

            <td>
                ${getInvestmentStatus(customer)}
            </td>

            <td class="customer-contact-cell">
                <span class="contact-protected">
                    Protected
                </span>
            </td>

            <td>
                ${actionContent}
            </td>
        `;


        customersTableBody.appendChild(row);


        if (canFetchContact) {

            const fetchButton =
                row.querySelector(".fetch-contact-button");


            const contactCell =
                row.querySelector(".customer-contact-cell");


            fetchButton.addEventListener("click", function () {

                fetchCustomerContact(
                    customer.id,
                    contactCell,
                    fetchButton
                );

            });

        }

    });

}


/* =========================================
   DASHBOARD STATISTICS
========================================= */

function updateStatistics() {

    const total = customers.length;

    const high =
        customers.filter(function (customer) {
            return customer.propensity === "high";
        }).length;


    const medium =
        customers.filter(function (customer) {
            return customer.propensity === "medium";
        }).length;


    const low =
        customers.filter(function (customer) {
            return customer.propensity === "low";
        }).length;


    totalCustomers.textContent = total;
    highCustomers.textContent = high;
    mediumCustomers.textContent = medium;
    lowCustomers.textContent = low;

}


/* =========================================
   DASHBOARD TITLE
========================================= */

function updateDashboardContent() {

    const high =
        customers.filter(function (customer) {
            return customer.propensity === "high";
        }).length;


    dashboardTableTitle.textContent =
        "High Propensity Accounts";


    dashboardTableDescription.textContent =
        `${high} customers identified for priority SIP follow-up.`;

}


/* =========================================
   ANALYTICS
========================================= */

function updateAnalytics() {

    const total = customers.length;


    const high =
        customers.filter(function (customer) {
            return customer.propensity === "high";
        }).length;


    const medium =
        customers.filter(function (customer) {
            return customer.propensity === "medium";
        }).length;


    const low =
        customers.filter(function (customer) {
            return customer.propensity === "low";
        }).length;


    const totalScore =
        customers.reduce(function (sum, customer) {

            return sum + customer.score;

        }, 0);


    const average =
        totalScore / total;


    const highPercentage =
        Math.round((high / total) * 100);


    const mediumPercentage =
        Math.round((medium / total) * 100);


    const lowPercentage =
        Math.round((low / total) * 100);


    averageScore.textContent =
        average.toFixed(1);


    highRate.textContent =
        highPercentage + "%";


    mediumRate.textContent =
        mediumPercentage + "%";


    lowRate.textContent =
        lowPercentage + "%";


    highDistributionText.textContent =
        highPercentage + "%";


    mediumDistributionText.textContent =
        mediumPercentage + "%";


    lowDistributionText.textContent =
        lowPercentage + "%";


    highProgress.style.width =
        highPercentage + "%";


    mediumProgress.style.width =
        mediumPercentage + "%";


    lowProgress.style.width =
        lowPercentage + "%";

}


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderEverything() {

    updateStatistics();

    updateDashboardContent();

    renderDashboardCustomers();

    renderCustomers();

    updateAnalytics();

}


/* =========================================
   INITIAL SETUP
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateThemeIcon();

});