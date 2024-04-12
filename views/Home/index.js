// Obtener elementos del DOM
const toggleMenuButton = document.getElementById('toggleMenuButton');
const loginSignupContainer = document.getElementById('loginSignupContainer');
const closeMenuButton = document.getElementById('closeMenuButton');

// Escuchar el clic en el botón del menú
toggleMenuButton.addEventListener('click', () => {
    // Alternar la clase para mostrar o ocultar el contenedor de los enlaces de inicio de sesión y registro
    loginSignupContainer.classList.toggle('translate-x-full');
});

// Escuchar el clic en el botón de cerrar el menú
closeMenuButton.addEventListener('click', () => {
    // Ocultar el contenedor de los enlaces de inicio de sesión y registro
    loginSignupContainer.classList.add('translate-x-full');
});

document.addEventListener('DOMContentLoaded', function() {
    let background = document.querySelector('.parallax-background');

    window.addEventListener('scroll', function() {
      let scrollValue = window.scrollY;
      background.style.transform = 'translateY(' + -scrollValue * 0.5 + 'px)';
    });
  });