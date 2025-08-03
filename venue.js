

// Initialize Budget
let budget = JSON.parse(localStorage.getItem("budget")) || [];

// Update floating button value
function updateBudgetButton() {
    const total = budget.reduce((sum, item) => sum + item.cost, 0);
    document.getElementById("budget-btn").textContent = `₹${total}`;
}

// Set button state if already booked
function preloadBookedButtons() {
    document.querySelectorAll(".card").forEach(card => {
        const name = card.querySelector("h3").textContent;
        const button = card.querySelector(".book-btn");
        if (budget.some(item => item.name === name)) {
            button.textContent = "Booked";
            button.style.background = "#6a0c2d";
        }
    });
}

updateBudgetButton();
preloadBookedButtons();

// Toggle booking
document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".card");
        const cost = parseInt(card.getAttribute("data-cost"));
        const name = card.querySelector("h3").textContent;

        // Determine the action based on current button text
        const isBooking = this.textContent === "Book Now" || this.textContent === "Booked";
        const isAdding = this.textContent === "Add" || this.textContent === "Added";

        if (this.textContent === "Book Now") {
            this.textContent = "Booked";
            this.style.background = "#473922";
            budget.push({ name, cost });
        } else if (this.textContent === "Booked") {
            this.textContent = "Book Now";
            this.style.background = "#3a2731ff";
            budget = budget.filter(item => item.name !== name);
        } else if (this.textContent === "Add") {
            this.textContent = "Added";
            this.style.background = "#473922";
            budget.push({ name, cost });
        } else if (this.textContent === "Added") {
            this.textContent = "Add";
            this.style.background = "#3a2731ff";
            budget = budget.filter(item => item.name !== name);
        }

        localStorage.setItem("budget", JSON.stringify(budget));
        updateBudgetButton();
    });
});

// Modal logic
const modal = document.getElementById("budget-modal");
const btn = document.getElementById("budget-btn");
const close = document.querySelector(".close");
const list = document.getElementById("budget-list");
const totalDisplay = document.getElementById("budget-total");

btn.onclick = function () {
    list.innerHTML = "";
    let total = 0;

    budget.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.cost}`;
        list.appendChild(li);
        total += item.cost;
    });

    totalDisplay.textContent = `Total: ₹${total}`;
    modal.style.display = "flex";
};

close.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (e) {
    if (e.target === modal) modal.style.display = "none";
};
