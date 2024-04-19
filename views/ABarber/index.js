// Cliente (Frontend)
document.getElementById('agregarCita').addEventListener('click', async function() {
    // Obtener valores de los campos
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let cliente = document.getElementById('cliente').value;

    // Crear objeto con los datos de la cita
    let nuevaCita = {
        fecha: fecha,
        hora: hora,
        cliente: cliente,
    };

    // Enviar los datos al servidor
    try {
        const response = await fetch('/api/agenda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaCita)
        });

        if (response.ok) {
            // La cita se guardó correctamente en la base de datos
            console.log('La cita se guardó correctamente');
            // Actualizar la lista de citas en la interfaz de usuario
            actualizarListaCitas();
        } else {
            console.error('Error al guardar la cita:', response.statusText);
            // Aquí podrías mostrar algún mensaje de error al usuario
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Aquí podrías mostrar algún mensaje de error al usuario
    }
});

// Función para actualizar la lista de citas en la interfaz de usuario
async function actualizarListaCitas() {
    try {
        const response = await fetch('/api/agenda');
        if (response.ok) {
            const citas = await response.json();
            // Limpiar la lista de citas actual
            document.getElementById('citas').innerHTML = '';
            // Agregar cada cita a la lista
            citas.forEach(cita => {
                let nuevaCitaElemento = document.createElement('li');
                nuevaCitaElemento.innerHTML = `
                    <div class="cita flex w-full flex-col border border-b mb-4 font-semibold border-stone-700 p-2 rounded-lg">
                        <span class="fecha-hora">${cita.fecha}</span>
                        <span class="fecha-hora">${cita.hora}</span>
                        <span class="Cliente">${cita.cliente}</span>
                        <br>
                        <button class="eliminar p-2 bg-red-500 hover:bg-red-600 rounded-lg">Eliminar</button>
                    </div>
                `;
                // Agregar evento de clic al botón de eliminar
                nuevaCitaElemento.querySelector('.eliminar').addEventListener('click', async function() {
                    // Eliminar la cita al hacer clic en el botón
                    await eliminarCita(cita.id);
                    // Actualizar la lista de citas en la interfaz de usuario
                    actualizarListaCitas();
                });
                // Agregar la nueva cita a la lista de citas
                document.getElementById('citas').appendChild(nuevaCitaElemento);
            });
        } else {
            console.error('Error al obtener las citas:', response.statusText);
            // Aquí podrías mostrar algún mensaje de error al usuario
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Aquí podrías mostrar algún mensaje de error al usuario
    }
}

// Función para eliminar una cita
async function eliminarCita(id) {
    try { 
        const response = await fetch(`/api/agenda/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            console.error('Error al eliminar la cita:', response.statusText);
            // Aquí podrías mostrar algún mensaje de error al usuario
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Aquí podrías mostrar algún mensaje de error al usuario
    }
}

// Llamar a la función para actualizar la lista de citas al cargar la página
window.addEventListener('load', actualizarListaCitas);