// Configura Stripe.js
let stripe = Stripe('pk_test_51P3sH408dp3BXQt1CK5nUgRHuS9fn3SFAS5E7heP2VBtKIRZxIB7P5G1vQF9lbeJLhMTm7cO8iDTG3k1BHmF9yat00MQ0yZn8I');
let elements = stripe.elements();
let cardElement = elements.create('card');
cardElement.mount('#card-element');

// Maneja los errores de la tarjeta en tiempo real
cardElement.addEventListener('change', function(event) {
  let displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Maneja el envío del formulario
let form = document.querySelector('form');
let submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function(ev) {
  stripe.createToken(cardElement).then(function(result) {
    if (result.error) {
      // Informa sobre los errores de la tarjeta
      let errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Envía el token a tu servidor
      stripeTokenHandler(result.token);
    }
  });
});

// Envía el token a tu servidor
function stripeTokenHandler(token) {
  // Aquí debes enviar el token al servidor para procesar el pago
  console.log(token);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('/api/citas', { withCredentials: true });
        const citas = response.data;

        citas.forEach(cita => {
            mostrarCita(cita);
        });
    } catch (error) {
        console.error('Error al obtener las citas:', error);
    }
});

function mostrarCita(cita) {
  const citasContainer = document.getElementById('citas-container');

  cita.services.forEach(servicio => {
      const citaElement = document.createElement('div');
      citaElement.classList.add('bg-stone-800', 'p-4', 'rounded-lg', 'w-full', 'md:w-full', 'lg:w-full', 'mb-4'); // Modificado: añadido padding p-4

      const citaContent = `
          <div class="text-sm">
              <img src="/images/perfil.svg" class="w-10 flex">
              <p class="text-sm"><strong>Cliente:</strong> ${cita.user.name}</p>
              <p class="text-sm"><strong>Email:</strong> ${cita.user.email}</p>
              <p class="text-sm"><strong>Fecha:</strong> ${cita.date}</p>
              <p class="text-sm"><strong>Hora:</strong> ${cita.hour}</p>
              <p class="text-sm"><strong>Servicio:</strong> ${servicio.service}</p>
              <p class="text-sm"><strong>Duración:</strong> ${servicio.duration}</p>
              <p class="text-sm"><strong>Precio:</strong> ${servicio.price}</p>
          </div>
          <button class="p-2 delete-cita-btn hover:bg-red-500 bg-red-600 text-white px-3 py-1 rounded mt-2">Eliminar</button> <!-- Modificado: añadido margen superior mt-2 -->
      `;

      citaElement.innerHTML = citaContent;

      // Agregar evento de click al botón de eliminar cita
      const deleteCitaBtn = citaElement.querySelector('.delete-cita-btn');
      deleteCitaBtn.addEventListener('click', async function() {
          try {
              // Eliminar la cita del DOM
              citaElement.remove();
              
              // Eliminar la cita de la base de datos
              const response = await axios.delete(`/api/citas/${cita.id}`, { withCredentials: true });
              if (response.status === 200) {
                  console.log('La cita ha sido eliminada exitosamente de la base de datos.');
              } else {
                  console.error('Error al eliminar la cita de la base de datos:', response.statusText);
                  throw new Error('Error al eliminar la cita de la base de datos');
              }
          } catch (error) {
              console.error('Error en la solicitud:', error);
          }
      });

      citasContainer.appendChild(citaElement);
  });
}