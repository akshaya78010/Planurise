// Load payment details
document.getElementById("event-name").textContent = localStorage.getItem("eventName") || "Custom Event";
document.getElementById("customer-name").textContent = localStorage.getItem("customerName") || "Guest";
document.getElementById("payment-type").textContent = localStorage.getItem("paymentType") || "Full Payment";
document.getElementById("payment-amount").textContent = `₹${localStorage.getItem("paymentAmount") || 0}`;

// Switch payment forms
document.querySelectorAll('input[name="method"]').forEach(radio => {
  radio.addEventListener("change", () => {
    document.getElementById("card-form").classList.toggle("hidden", radio.value !== "card");
    document.getElementById("upi-form").classList.toggle("hidden", radio.value !== "upi");
  });
});

// Handle card payment
document.getElementById("card-form").addEventListener("submit", function(e) {
  e.preventDefault();
  openSuccessModal();
});

// Handle UPI payment
document.getElementById("upi-form").addEventListener("submit", function(e) {
  e.preventDefault();
  openSuccessModal();
});

function openSuccessModal() {
  const modal = document.getElementById("success-modal");
  modal.style.display = "flex";
}

// Redirect after success
function redirectToEvents() {
  window.location.href = "my_events.html";
}
