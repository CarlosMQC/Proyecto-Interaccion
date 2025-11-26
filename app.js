document.addEventListener('DOMContentLoaded', () => {

let habitacionSeleccionada = 'Individual';
let fechaLlegadaSeleccionada = '';
let fechaSalidaSeleccionada = '';
let metodoPagoSeleccionado = 'Efectivo';

const reservaModalEl = document.getElementById('reservaModal');
const loginModalEl = document.getElementById('loginModal');
const registroModalEl = document.getElementById('registroModal');
const confirmacionModalEl = document.getElementById('confirmacionModal');

let reservaModal, loginModal, registroModal, confirmacionModal;

if (reservaModalEl) reservaModal = new bootstrap.Modal(reservaModalEl);
if (loginModalEl) loginModal = new bootstrap.Modal(loginModalEl);
if (registroModalEl) registroModal = new bootstrap.Modal(registroModalEl);
if (confirmacionModalEl) confirmacionModal = new bootstrap.Modal(confirmacionModalEl);
const widgetDeReserva = document.getElementById('reservarBtn');
if (widgetDeReserva) {
const fpLlegada = flatpickr("#fecha-llegada", {
mode: "range",
dateFormat: "d/m/Y",
minDate: "today",
locale: "es",
onChange: function(selectedDates, dateStr) {
}
});

widgetDeReserva.addEventListener('click', () => {
alert('Botón RESERVAR presionado');
});
}

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
if (loginBtn && registerBtn) {
loginBtn.addEventListener('click', () => {
if(loginModal) loginModal.show();
});
registerBtn.addEventListener('click', () => {
if(registroModal) registroModal.show();
});
}

const scrollContainer = document.querySelector('.scrolling-wrapper');
const scrollNextBtn = document.getElementById('scroll-next');
const scrollPrevBtn = document.getElementById('scroll-prev');

if (scrollContainer && scrollNextBtn && scrollPrevBtn) {
const scrollCarousel = (direction) => {
const card = document.querySelector('.room-card-wrapper');
if (card) {
const cardWidth = card.offsetWidth;
scrollContainer.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
}
};

scrollNextBtn.addEventListener('click', () => scrollCarousel(1));
scrollPrevBtn.addEventListener('click', () => scrollCarousel(-1));
}
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('login-password');

if (togglePassword && passwordInput) {
togglePassword.addEventListener('click', () => {
const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
passwordInput.setAttribute('type', type);
togglePassword.classList.toggle('fa-eye');
togglePassword.classList.toggle('fa-eye-slash');
});
}

const registroForm = document.getElementById('registroForm');
if (registroForm) {
const toggleRegistroPassword = document.getElementById('toggleRegistroPassword');
const registroPasswordInput = document.getElementById('registro-password');
const registroSubmitBtn = document.getElementById('registroSubmitBtn');
const requiredInputs = registroForm.querySelectorAll('[required]');

if (toggleRegistroPassword && registroPasswordInput) {
toggleRegistroPassword.addEventListener('click', () => {
const type = registroPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
registroPasswordInput.setAttribute('type', type);
toggleRegistroPassword.classList.toggle('fa-eye');
toggleRegistroPassword.classList.toggle('fa-eye-slash');
});
}

const validateForm = () => {
let allValid = true;
requiredInputs.forEach(input => {
if (input.type === 'checkbox') {
if (!input.checked) {
allValid = false;
}
} else {
if (input.value.trim() === '') {
allValid = false;
}
}
});
registroSubmitBtn.disabled = !allValid;
};

requiredInputs.forEach(input => {
input.addEventListener('input', validateForm);
input.addEventListener('change', validateForm);
});
}

});