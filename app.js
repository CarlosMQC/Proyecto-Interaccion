document.addEventListener('DOMContentLoaded', () => {

    let habitacionSeleccionada = 'Individual'; 
    let fechaLlegadaSeleccionada = '';
    let fechaSalidaSeleccionada = '';
    let metodoPagoSeleccionado = 'Efectivo';

    const reservaModalEl = document.getElementById('reservaModal');
    const loginModalEl = document.getElementById('loginModal');
    const registroModalEl = document.getElementById('registroModal');

    let reservaModal, loginModal, registroModal;

    if (reservaModalEl) reservaModal = new bootstrap.Modal(reservaModalEl);
    if (loginModalEl) loginModal = new bootstrap.Modal(loginModalEl);
    if (registroModalEl) registroModal = new bootstrap.Modal(registroModalEl);
    
    const widgetDeReserva = document.getElementById('reservarBtn');
    if (widgetDeReserva) {
        flatpickr("#fecha-llegada", {
            mode: "range",
            dateFormat: "d/m/Y",
            minDate: "today",
            locale: "es"
        });

        widgetDeReserva.addEventListener('click', () => {
            alert('Botón RESERVAR presionado. Redirigiendo a resultados...');
        });
    }

    const reservaCheckin = document.getElementById('reserva-checkin');
    const reservaCheckout = document.getElementById('reserva-checkout');

    if (reservaCheckin) {
        flatpickr(reservaCheckin, {
            dateFormat: "d/m/Y",
            minDate: "today",
            locale: "es"
        });
    }

    if (reservaCheckout) {
        flatpickr(reservaCheckout, {
            dateFormat: "d/m/Y",
            minDate: "today",
            locale: "es"
        });
    }

    const reservaPageForm = document.querySelector('.reserva-form-panel form');
    if (reservaPageForm) {
        reservaPageForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            alert("¡Reserva confirmada con éxito! Gracias por elegirnos.");
            window.location.href = 'index.html';
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
                    if (!input.checked) { allValid = false; }
                } else {
                    if (input.value.trim() === '') { allValid = false; }
                }
            });
            registroSubmitBtn.disabled = !allValid;
        };

        requiredInputs.forEach(input => {
            input.addEventListener('input', validateForm);
            input.addEventListener('change', validateForm);
        });

        registroForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            const dni = document.getElementById('registro-dni').value.trim();
            const email = document.getElementById('registro-email').value.trim();
            const password = document.getElementById('registro-password').value;

            if (dni.length !== 8 || isNaN(dni)) {
                alert("⚠️ Error en el DNI:\nDebe tener exactamente 8 números.");
                return;
            }

            if (!email.toLowerCase().endsWith('@gmail.com')) {
                alert("⚠️ Error en el Correo:\nSolo se aceptan correos que terminen en @gmail.com");
                return;
            }

            const tieneMayuscula = /[A-Z]/.test(password);
            const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            if (!tieneMayuscula || !tieneEspecial) {
                alert("⚠️ Error en la Contraseña:\nDebe contener al menos una letra MAYÚSCULA y un carácter especial.");
                return;
            }

            alert("✅ ¡Registrado con éxito!");
            if (registroModal) registroModal.hide();
            registroForm.reset();
            registroSubmitBtn.disabled = true;
        });
    }

    const loginForm = document.querySelector('#loginModal form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert("¡Bienvenido! Sesión iniciada con éxito.");
            if (loginModal) loginModal.hide();
            loginForm.reset();
        });
    }

});