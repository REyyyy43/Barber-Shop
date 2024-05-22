const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formBtn = document.querySelector('#form-btn');
const errorText = document.querySelector('#error-text');
const togglePassword = document.querySelector('#toggle-password');
const togglePasswordIcon = togglePassword.querySelector('i');

// Validaciones Regex
const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// Variables de Validación
let emailValidation = false;
let passwordValidation = false;

const validation = (input, regexValidation) => {
    formBtn.disabled = !emailValidation || !passwordValidation;

    input.classList.remove('focus:outline-cyan-950', 'outline-red-500', 'outline-green-500', 'outline-2', 'outline');

    if (input.value === '') {
        input.classList.add('focus:outline-cyan-950');
    } else if (regexValidation) {
        input.classList.add('outline-green-500', 'outline-2', 'outline');
    } else {
        input.classList.add('outline-red-500', 'outline-2', 'outline');
    }
};

// Eventos de entrada para validación
emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    validation(passwordInput, passwordValidation);
});

// Evento de clic para mostrar/ocultar la contraseña
togglePassword.addEventListener('click', () => {
    const isPasswordVisible = passwordInput.type === 'text';
    passwordInput.type = isPasswordVisible ? 'password' : 'text';
    togglePasswordIcon.classList.toggle('fa-eye', isPasswordVisible);
    togglePasswordIcon.classList.toggle('fa-eye-slash', !isPasswordVisible);
});

// Evento de envío de formulario
form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value,
        };
        const { data } = await axios.post('/api/login', user);
        if (data.role === 'admin') {
            window.location.pathname = '/Admin/';
        } else {
            window.location.pathname = '/ABarberP/';
        }
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response.data.error;
    }
});