// Fetch stored budget
let budget = JSON.parse(localStorage.getItem("budget")) || [];

// Fetch customer details dynamically
let selectedEvent = localStorage.getItem("selectedEvent");
let customer = JSON.parse(localStorage.getItem("customerDetails")) || {
    name: "Guest User",
    event: selectedEvent|| "Wedding",
    contact: "+91 0000000000",
    invoice: Math.floor(Math.random() * 100000) // fallback invoice
};

// Fill date
document.getElementById("bill-date").textContent = new Date().toLocaleDateString("en-IN");

// Fill customer details dynamically
document.getElementById("customer-left").innerHTML = `
    <strong>Customer Name:</strong> ${customer.name}<br>
    <strong>Event:</strong> ${customer.event}
`;
document.getElementById("customer-right").innerHTML = `
    <strong>Invoice #:</strong> ${customer.invoice}<br>
    <strong>Contact:</strong> ${customer.contact}
`;

// Populate table & totals
const tableBody = document.getElementById("bill-items");
const subtotalDisplay = document.getElementById("subtotal");
const gstDisplay = document.getElementById("gst");
const totalDisplay = document.getElementById("final-total");

let subtotal = 0;

budget.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.category || "General"}</td>
        <td>₹${item.cost}</td>
    `;
    tableBody.appendChild(tr);
    subtotal += item.cost;
});

// GST & final total
const gstAmount = Math.round(subtotal * 0.18);
const finalTotal = subtotal + gstAmount;

subtotalDisplay.textContent = `Subtotal: ₹${subtotal}`;
gstDisplay.textContent = `GST (18%): ₹${gstAmount}`;
totalDisplay.innerHTML = `<strong>Total: ₹${finalTotal}</strong>`;

// Save button → redirect to My Events
function saveBill() {
    window.location.href = "my_events.html";
}

// Open animated modal
function openPaymentModal() {
    const modal = document.getElementById("paymentModal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10); // trigger animation
}

// Handle payment type
function proceedPayment(type) {
    let amount = finalTotal;
    if (type === "advance") {
        amount = Math.round(finalTotal * 0.3); // 30% advance
    }

    // Save payment data in localStorage
    localStorage.setItem("paymentType", type === "advance" ? "Advance Payment" : "Full Payment");
    localStorage.setItem("paymentAmount", amount);
    localStorage.setItem("eventName", customer.event);
    localStorage.setItem("customerName", customer.name);

    // Redirect to payment page
    window.location.href = "payment.html";
}


// Close modal on background click
window.onclick = function(event) {
    const modal = document.getElementById("paymentModal");
    if (event.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
    }
};
