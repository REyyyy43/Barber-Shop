document.addEventListener('DOMContentLoaded', async function() {
    const listService = document.getElementById('list-service');
    const payBtn = document.getElementById('pay-btn'); // Botón de pagar
    const payBarberBtn = document.getElementById('pay-barber-btn');
    const totalPriceCitasElement = document.getElementById('total-price-citas-value');
    const totalPriceElement = document.getElementById('total-price-value');
    const selectedDateElement = document.getElementById('selected-date');
    const selectedHourElement = document.querySelector('.selected-hour');
    const cartItemsContainer = document.getElementById('cart-items');
    const acceptBtn = document.getElementById('accept-btn');
    const hiddenDiv = document.querySelector('.view');
    

    // Función para habilitar o deshabilitar el botón de aceptar según el estado del carrito
    function toggleAcceptButton() {
        if (cartItemsContainer.children.length === 0) {
            // Si el carrito está vacío, deshabilitar el botón de aceptar
            acceptBtn.disabled = true;
        } else {
            // Si el carrito no está vacío, habilitar el botón de aceptar
            acceptBtn.disabled = false;
        }
    }

    acceptBtn.addEventListener('click', function() {
        // Remover la clase 'hidden' del elemento
        hiddenDiv.classList.remove('hidden');
        // Agregar la clase de animación de entrada de Animate.css
        hiddenDiv.classList.add('animate__animated', 'animate__fadeIn');

        // Hacer scroll hasta el elemento visible
        hiddenDiv.scrollIntoView({ behavior: 'smooth' });
    });

    // Llamar a la función para establecer el estado inicial del botón de aceptar
    toggleAcceptButton();

    let totalPrice = 0;
    let services;
    let selectedServices = []; // Array para almacenar los servicios seleccionados
    let selectedDate;
    let selectedHour;

    try {
        const response = await axios.get('/api/services', { withCredentials: true });
        services = response.data;

        for (const service of services) {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="flex flex-col">
                    <h3 class="font-medium text-xl mb-1 text-white service-name">${service.service}</h3>
                    <p class="text-sm mb-1 text-white service-duration">${service.duration}</p>
                    <p class="font-medium text-sm text-white service-price">${service.price}</p> 
                </div>
                <div>
                    <button class="plus-btn bg-stone-700 hover:bg-stone-500 text-white px-3 py-1 rounded-full" data-service-id="${service.id}" data-service-price="${service.price}" data-service-name="${service.service}">+</button>
                </div>
            `;
            div.classList.add('bg-stone-800', 'rounded-xl', 'border', 'border-1', 'border-stone-600', 'px-4', 'py-2', 'mb-2', 'flex', 'items-center', 'justify-between', 'text-white');
            listService.appendChild(div);
        }

        listService.addEventListener('click', async function(event) {
            if (event.target.classList.contains('plus-btn')) {
                const serviceName = event.target.dataset.serviceName; // Obtener el nombre del servicio desde el atributo data-service-name
                const servicePrice = parseFloat(event.target.dataset.servicePrice);
                const selectedService = services.find(service => service.service === serviceName); // Buscar el servicio por nombre

                if (selectedService) {
                    // Agregar el servicio seleccionado al array
                    selectedServices.push(selectedService);

                    totalPrice += servicePrice;
                    totalPriceElement.textContent = totalPrice.toFixed(2);

                    // Mostrar el servicio seleccionado en el primer carrito
                    const cartItem = document.createElement('li'); 

                    // Crear el contenedor del icono de cancelar
                    const cancelContainer = document.createElement('div');
                    cancelContainer.classList.add('cancel-container');

                    // Crear el icono de cancelar (X)
                    const cancelIcon = document.createElement('i');
                    cancelIcon.classList.add('fas', 'fa-times', 'text-white', 'hover:bg-red-700', 'bg-red-500', 'p-2', 'rounded-lg', 'flex', 'justify-end');

                    // Aplicar estilos al contenedor del icono de cancelar
                    cancelContainer.style.position = 'absolute';
                    cancelContainer.style.top = '0';
                    cancelContainer.style.right = '0';
                    cancelContainer.style.padding = '4px';

                    // Aplicar estilos al icono de cancelar
                    cancelIcon.style.fontSize = '16px';
                    cancelIcon.style.cursor = 'pointer';

                    cancelIcon.addEventListener('click', async function(event) {
                        event.preventDefault();
                        const cartItem = event.currentTarget.parentElement.parentElement;
                        cartItem.remove();
                        totalPrice -= servicePrice;
                        totalPriceElement.textContent = totalPrice.toFixed(2);
                        // Eliminar también del segundo carrito si existe
                        const serviceName = cartItem.querySelector('p.font-bold').textContent;
                        const selectedServiceItems = document.querySelectorAll('#selected-services-list li');
                        selectedServiceItems.forEach(item => {
                            if (item.querySelector('p.font-bold').textContent === serviceName) {
                                item.remove();
                            }
                        });

                        citaCount();
                    });

                    // Agregar el icono de cancelar al contenedor
                    cancelContainer.appendChild(cancelIcon);

                    // Agregar el contenedor del icono de cancelar al HTML del carrito
                    cartItem.innerHTML = `
                        <div class="flex flex-col p-3 justify-between border border-stone-600 rounded-lg relative">
                            <p class="font-bold">${event.target.dataset.serviceName}</p>  
                            <p class="font-semibold">${selectedService.duration}</p>  
                            <p class="font-semibold">${selectedService.price}</p>
                        </div>`;
                    cartItem.querySelector('div').appendChild(cancelContainer); // Agregar el contenedor del icono de cancelar al div del carrito
                    cartItemsContainer.appendChild(cartItem);

                    // Mostrar los detalles del servicio en el segundo carrito si existe
                    const selectedServicesList = document.getElementById('selected-services-list');
                    if (selectedServicesList) {
                        const cartItemDetails = document.createElement('li'); 
                        cartItemDetails.innerHTML = `
                            <div class="flex flex-col p-2 w-full justify-between border border-stone-600 rounded-lg">
                                <p class="font-bold">${event.target.dataset.serviceName}</p>  
                                <p class="font-semibold">${selectedService.duration}</p>  
                                <p class="font-semibold">${selectedService.price}</p>
                            </div>`;
                        cartItemDetails.classList.add('p-2', 'flex', 'items-center', 'justify-between', 'font-bold');
                        selectedServicesList.appendChild(cartItemDetails);

                        // Agregar el precio total al segundo carrito
                        const totalPriceElementCitas = document.getElementById('total-price-citas');
                        if (totalPriceElementCitas) {
                            totalPriceElementCitas.textContent = totalPrice.toFixed(2);
                        }
                    }
                } else {
                    console.error('No se encontró el servicio con nombre:', serviceName);
                }
                // Llamar a la función para actualizar el estado del botón de aceptar después de modificar el carrito
                toggleAcceptButton();
            }
        });

        // Manejar clic en el botón de pagar
        payBtn.addEventListener('click', async function() {
           
            if (!selectedDate || !selectedHour) {
                // Si no se ha seleccionado una fecha o una hora, mostrar mensaje de error
                const errorMessageContainer = document.getElementById('error-text');
                errorMessageContainer.textContent = 'Por favor, seleccione una fecha y una hora para continuar.';
                errorMessageContainer.classList.add('text-red-500', 'font-bold', 'mt-2');
        
                // Ocultar el mensaje de error después de 3 segundos
                setTimeout(() => {
                    errorMessageContainer.textContent = '';
                }, 3000);
        
                return; // Detener la ejecución de la función
            }
        

             // Crear un objeto con los datos de la cita
            const citaData = {
                services: selectedServices,
                date: selectedDate, 
                hour: selectedHour, 
                totalPrice: totalPrice
            };

            console.log(citaData);

            try {
                // Enviar los datos de la cita al backend
                const citaResponse = await axios.post('/api/citas', citaData);
                console.log('Cita guardada en la base de datos:', citaResponse.data);

                // Redirigir a la página de pago después de guardar la cita
                window.location.href = '/Pago';

                // Mostrar notificación de éxito
                const notificationElement = document.getElementById('notification');
                notificationElement.textContent = 'Cita agendada exitosamente.';
                notificationElement.classList.add('text-green-500', 'font-bold', 'mt-2');
                payBtn.parentNode.insertBefore(notificationElement, payBtn.nextSibling);

                // Ocultar la notificación después de 0.3 segundos
                setTimeout(() => {
                    notificationElement.style.display = 'none';
                }, 3000);

                // Limpiar los servicios seleccionados, precio total y carrito
                selectedServices = [];
                totalPrice = 0;
                totalPriceElement.textContent = 0;
                totalPriceCitasElement.textContent = 0;
                selectedDateElement.textContent = '';
                selectedHourElement.textContent = '';
                cartItemsContainer.innerHTML = '';
            } catch (error) {
                if (error.response.status === 400) {
                    // En caso de error, establece el mensaje de error en el contenedor y muéstralo
                    const errorMessageContainer = document.getElementById('error-message');
                    errorMessageContainer.textContent = error.response.data.error;
                    errorMessageContainer.classList.add('text-red-500','text-sm', 'font-serif', 'mt-2');
                    
                    // Ocultar la notificación después de 0.3 segundos
                    setTimeout(() => {
                        errorMessageContainer.style.display = 'none';
                        
                    }, 2000); 
                } else {
                    console.error('Error al guardar la cita en la base de datos:', error);
                }
            }
        });

        // Manejar clic en el botón de pagar para el barbero
      // Manejar clic en el botón de pagar para el barbero
payBarberBtn.addEventListener('click', async function() {
    
    if (!selectedDate || !selectedHour) {
        // Si no se ha seleccionado una fecha o una hora, mostrar mensaje de error
        const errorMessageContainer = document.getElementById('error-text');
        errorMessageContainer.textContent = 'Por favor, seleccione una fecha y una hora para continuar.';
        errorMessageContainer.classList.add('text-red-500', 'font-bold', 'mt-2');

        // Ocultar el mensaje de error después de 3 segundos
        setTimeout(() => {
            errorMessageContainer.textContent = '';
        }, 3000);

        return; // Detener la ejecución de la función
    }

    // Crear un objeto con los datos de la cita
    const citaData = {
        services: selectedServices,
        date: selectedDate, 
        hour: selectedHour, 
        totalPrice: totalPrice
    };

    // Enviar los datos de la cita al backend
    try {
        const citaResponse = await axios.post('/api/citas', citaData);
        console.log('Cita guardada en la base de datos:', citaResponse.data);

        // Mostrar notificación de éxito
        const notificationElement = document.getElementById('notification');
        notificationElement.textContent = 'Cita agendada exitosamente.';
        notificationElement.classList.add('text-green-500', 'font-bold', 'mt-2');
        payBtn.parentNode.insertBefore(notificationElement, payBtn.nextSibling);

        // Ocultar la notificación después de 0.3 segundos
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 2000);

        // Limpiar los servicios seleccionados, precio total y carrito
        selectedServices = [];
        totalPrice = 0;
        totalPriceElement.textContent = 0;
        totalPriceCitasElement.textContent = 0;
        selectedDateElement.textContent = '';
        selectedHourElement.textContent = '';
        cartItemsContainer.innerHTML = '';
    } catch (error) {
        if (error.response.status === 400) {
            // En caso de error, establece el mensaje de error en el contenedor y muéstralo
            const errorMessageContainer = document.getElementById('error-message');
            errorMessageContainer.textContent = error.response.data.error;
            errorMessageContainer.classList.add('text-red-500','text-sm', 'font-serif', 'mt-2');
            
            // Ocultar la notificación después de 0.3 segundos
            setTimeout(() => {
                errorMessageContainer.style.display = 'none';
                
            }, 2000); 
    } else {
        console.error('Error al guardar la cita en la base de datos:', error);
    }
}
});

        // Función para cargar la lista de horas
        async function loadHourList() {
            const hourList = document.getElementById('hour-list');
            const hours = ['10:30am', '11:00am', '12:30pm', '13:00pm', '14:00pm', '15:00pm', '16:00pm', '17:00pm', '18:00pm', '19:00pm', '20:00pm', '21:00pm'];

            hourList.innerHTML = '';
 

            hours.forEach(hour => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <button class="hour-btn w-full p-4 text-white border border-stone-500 rounded-lg bg-stone-800">
                        <div class="flex items-center justify-between">
                            <span class="sr-only">${hour}</span>
                            <h3 class="font-medium">${hour}</h3>
                        </div>
                    </button>
                    `;
                   
                hourList.appendChild(listItem);
            });

            hourList.addEventListener('click', async function(event) {
                const clickedButton = event.target.closest('.hour-btn');
                if (clickedButton) {
                    const hour = clickedButton.querySelector('h3').textContent;
                    selectedHourElement.textContent = hour;
                    selectedDate = selectedDateElement.textContent;
                    selectedHour = hour; // Actualizar selectedHour
                }
            });
        }

        await loadHourList();

        // Crear un objeto de fecha
        let currentDate = new Date();

        // Obtener el nombre completo del mes (por ejemplo, "junio")
        let month = currentDate.toLocaleString('default', { month: 'long' });

        // Concatenar cadenas de año y mes y establecerlas como innerHTML
        document.getElementById("date").innerHTML = month + " " + currentDate.getFullYear();

        // Obtener referencias a los botones y al contenedor de fechas
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carouselDates = document.querySelector('.carousel-dates');
        const selectedDateElement = document.getElementById('selected-date'); // Agregar referencia al elemento del carrito de fecha seleccionada

        // Función para cargar las fechas en el carrusel
        async function loadCarouselDates() {
            // Limpiar el contenido del carrusel
            carouselDates.innerHTML = '';

            // Calcular el número de fechas a mostrar según el tamaño de la pantalla
            const numberOfDatesToShow = window.innerWidth < 768 ? 5 : 6;

            // Agregar fechas al carrusel
            for (let i = 0; i < numberOfDatesToShow; i++) {
                const dateElement = document.createElement('div');
                dateElement.classList.add('p-2', 'flex', 'flex-col', 'items-center', 'justify-center', 'font-bold', 'rounded-full', 'text-white', 'md:mr-2'); // Agregar margen derecho

                // Crear un span para el número del día
                const dayNumberText = currentDate.getDate().toString().padStart(2, '0');
                dateElement.innerHTML = `
                    <button class="font-bold rounded-full text-sm md:text-2xl bg-stone-600 p-4 mb-1 md:w-16 md:h-16 h-10 w-10 flex items-center justify-center">
                        <span class="sr-only">${dayNumberText}</span>
                        ${dayNumberText}
                    </button>
                `;

                // Capturar el valor de la fecha actual en el momento del clic
                const dateValue = new Date(currentDate);
                
                dateElement.addEventListener('click', async function() {
                    const selectedDateText = dateValue.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });
                    console.log('Fecha seleccionada:', selectedDateText);
                    
                    // Mostrar la fecha seleccionada en el carrito
                    selectedDateElement.textContent = selectedDateText;

                    // Agregar aquí la lógica para utilizar la fecha seleccionada
                });

                // Agregar el día de la semana al elemento de fecha
                const dayOfWeek = document.createElement('span');
                dayOfWeek.textContent = currentDate.toLocaleDateString('es-ES', { weekday: 'short' }); // Obtener el día de la semana
                dayOfWeek.classList.add('md:text-xl'); // Estilo adicional para el tamaño del texto
                dateElement.appendChild(dayOfWeek);

                carouselDates.appendChild(dateElement);

                // Avanzar al siguiente día
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        // Manejar el evento de clic en el botón "Anterior"
        prevBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 0); // Retroceder una semana
            loadCarouselDates();
        });

        // Manejar el evento de clic en el botón "Siguiente"
        nextBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 0); // Avanzar una semana
            loadCarouselDates();
        });

        // Mostrar las fechas iniciales
        loadCarouselDates();

    } catch (error) {
        console.error('Error al obtener los servicios:', error);
    }
});

