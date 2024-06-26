const navbar = document.getElementById('navbar');

const createNavHome = () => {

    navbar.innerHTML = `

    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/Captura de pantalla 2024-02-16 030656.png" class="h-20" alt="Flowbite Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white font-serif"></span>
    </div> 
    <div class="ml-auto"> <!-- Utilizamos ml-auto para mover este div completamente a la derecha -->
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 md:hidden p-2 rounded-lg text-white cursor-pointer hover:bg-stone-700"
        >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 9h16.5m-16.5 6.75h16.5" 
            />
        </svg>
    </div>

      <div class="flex md:order-2 space-x-4 p-3 md:space-x-4 rtl:space-x-reverse relative"> <!-- Añade la clase relative -->
      <a href="/login/" class="transition ease-in-out hover:bg-stone-500 hidden md:block text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Log in</a>
      <a href="/signup/" class=" hidden md:block text-white font-medium bg-stone-700 hover:bg-stone-600 transition ease-in-out rounded-lg text-sm px-4 py-2 text-center p-2">Sign Up</a>
      </div>

      
      <div class="bg-stone-900/80 fixed top-28 right-0 left-0 bottom-0 pt-16 z-10 flex justify-center items-center flex-col gap-4 hidden">
      <a href="/login/" class="transition ease-in-out hover:bg-stone-500 md:hidden text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Log in</a>
      <a href="/signup/" class=" text-white font-medium bg-stone-700 hover:bg-stone-600 transition ease-in-out rounded-lg text-sm px-4 py-2 text-center p-2">Sign Up</a>
      </div>
  
    `;
};

const createNavABarberP = () => {

    navbar.innerHTML = `
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/Captura de pantalla 2024-02-16 030656.png" class="h-20" alt="Flowbite Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white font-serif"></span>
    </div> 
    <div class="ml-auto"> <!-- Utilizamos ml-auto para mover este div completamente a la derecha -->
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 md:hidden p-2 rounded-lg text-white cursor-pointer hover:bg-stone-700"
        >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 9h16.5m-16.5 6.75h16.5" 
            />
        </svg>
    </div>

      <div class="flex md:order-2 space-x-4 p-3 md:space-x-4 rtl:space-x-reverse relative"> <!-- Añade la clase relative -->
      <button class="transition ease-in-out hover:bg-red-500 hidden md:block text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Cerrar sesion</button>
      <a href="/Citasave/" class=" hidden md:block text-white font-medium bg-stone-700 hover:bg-stone-600 transition ease-in-out rounded-lg text-sm px-4 py-2 text-center p-2">Ver citas agendadas</a>
      </div>

      
    <div class="bg-stone-900/80 fixed top-28 right-0 left-0 bottom-0 pt-16 z-10 flex justify-center items-center flex-col gap-4 hidden">
    <button id="close-btn" class="transition ease-in-out hover:bg-red-500 md:hidden text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Cerrar sesion</button>
    <a href="/Citasave/" class=" text-white font-medium bg-stone-700 hover:bg-stone-600 transition ease-in-out rounded-lg text-sm px-4 py-2 text-center p-2">Ver citas agendadas</a>
    </div>

     
`; 
};

const createNavABarber = () => {

    navbar.innerHTML = `
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/Captura de pantalla 2024-02-16 030656.png" class="h-20" alt="Flowbite Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white font-serif"></span>
    </div> 
    <div class="ml-auto"> <!-- Utilizamos ml-auto para mover este div completamente a la derecha -->
        <div class=" top-0 mb-5 right-0 left-0 bottom-0 pt-1 z-10 flex justify-center items-center flex-col gap-4">
    <a href="/Admin/" class="border border-b border-stone-700 transition ease-in-out hover:bg-stone-500  text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-4 py-2 text-center">inicio</a>
     </div>
    </div>

   

     
`; 
};

const createNavAdmin = () => {

    navbar.innerHTML = `

    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/images/Captura de pantalla 2024-02-16 030656.png" class="h-20" alt="Flowbite Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white font-serif"></span>
    </div> 
    <div class="ml-auto"> <!-- Utilizamos ml-auto para mover este div completamente a la derecha -->
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-10 h-10 md:hidden p-2 rounded-lg text-white cursor-pointer hover:bg-stone-700"
        >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 9h16.5m-16.5 6.75h16.5" 
            />
        </svg>
    </div>

      <div class="flex md:order-2 space-x-4 p-3 md:space-x-4 rtl:space-x-reverse relative"> <!-- Añade la clase relative -->
      <button class="transition ease-in-out hover:bg-red-500 hidden md:block text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Cerrar sesion</button>
      </div>

      
    <div class="bg-stone-900/80 fixed top-28 right-0 left-0 bottom-0 pt-16 z-10 flex justify-center items-center flex-col gap-4 hidden">
    <button id="close-btn" class="transition ease-in-out hover:bg-red-500 md:hidden text-white bg-transparent  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Cerrar sesion</button>
     </div>
    `;
};



if (window.location.pathname === '/') {
    createNavHome();
} else if (window.location.pathname === '/ABarberP/') {
    createNavABarberP();
} else if (window.location.pathname === '/ABarber/') {
    createNavABarber();
} else if (window.location.pathname === '/Admin/') {
    createNavAdmin();
} 

const navButton = navbar.children[0].children[1].querySelector('svg');

navButton.addEventListener('click', e => {
    const menuMobile = navbar.children[0].children[3];
    if (!navButton.classList.contains('active')) {
        navButton.querySelector('path').setAttribute('d', 'M6 18 18 6M6 6l12 12');
        navButton.classList.add('active');
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');
    } else {
        navButton.querySelector('path').setAttribute('d', 'M3.75 9h16.5m-16.5 6.75h16.5');
        navButton.classList.remove('active');
        menuMobile.classList.add('hidden');
        menuMobile.classList.remove('flex');
    }
});



// Esta variable te ayudará a controlar si el usuario ya cerró la sesión
let loggedOut = false;

// Agregar evento beforeunload para detectar cuando el usuario intenta salir de la página
window.addEventListener('beforeunload', function (e) {
    // Si el usuario no ha cerrado la sesión, mostrar el mensaje de advertencia
    if (!loggedOut) {
        const confirmationMessage = '¿Seguro que quieres salir? Se cerrará la sesión.';
        (e || window.event).returnValue = confirmationMessage; // Para navegadores más antiguos
        return confirmationMessage;
    }
});

const closeBtnDesktop = navbar.children[0].children[2].children[0];
const closeBtnMobile = navbar.children[0].children[3].children[0];


closeBtnDesktop.addEventListener('click', async e => { 
    try {
        await axios.get('/api/logout');

        loggedOut = true; // Marcamos que el usuario ha cerrado la sesión
        window.location.replace('/login');

    } catch (error) {
        console.log(error);
    }
});

closeBtnMobile.addEventListener('click', async e => { 
    try {
        await axios.get('/api/logout');

        loggedOut = true; // Marcamos que el usuario ha cerrado la sesión
        window.location.replace('/login');

    } catch (error) {
        console.log(error);
    }
});
