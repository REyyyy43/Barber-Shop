const citasRouter = require('express').Router();
const Cita = require('../models/cita');
const User = require('../models/user');

// Obtener todas las citas de un usuario específico
citasRouter.get('/', async (request, response) => {
    try {
        // Buscar todas las citas en la base de datos sin filtrar por usuario
        const citas = await Cita.find({}).populate('user', 'name email');
        return response.status(200).json(citas);
    } catch (error) {
        console.error('Error al buscar citas:', error);
        return response.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear una nueva cita
citasRouter.post('/', async (request, response) => {
    try {
        const user = request.user;
        const { date, hour, services, totalPrice } = request.body;

        // Verificar disponibilidad de la cita
        const citaExists = await Cita.findOne({ date, hour });
        if (citaExists && citaExists.reservada) {
            return response.status(400).json({ error: 'La fecha y hora seleccionadas no están disponibles. Por favor, elige otra.' });
        }

        // Crear una nueva instancia de Cita con todos los datos necesarios
        const newCita = new Cita({
            date: date,
            hour: hour,
            services: services.map(service => ({
                service: service.service,
                duration: service.duration,
                price: service.price
            })),
            totalPrice: totalPrice,
            user: user._id,
            reservada: true // Marcar la cita como reservada
        });

        // Guardar la nueva cita en la base de datos
        const savedCita = await newCita.save();

        // Actualizar el campo 'citas' del usuario para incluir la referencia a la nueva cita
        user.citas.push(savedCita._id);
        await user.save();

        // Devolver la cita guardada junto con su ID
        response.status(200).json({ cita: savedCita });

        // Aquí puedes iniciar un temporizador o programador para marcar la cita como finalizada después de un cierto tiempo.
        // Supongamos que después de 1 hora, la cita se marca como finalizada.
        setTimeout(async () => {
            // Marcar la cita como finalizada
            savedCita.finished = true;
            await savedCita.save();

            // Verificar si hay otras citas activas para la misma hora y fecha
            const activeCitas = await Cita.find({ date: savedCita.date, hour: savedCita.hour, reservada: true });
            
            // Si no hay otras citas activas, marcar la hora como disponible nuevamente
            if (activeCitas.length === 1) {
                await Cita.updateMany({ date: savedCita.date, hour: savedCita.hour }, { reservada: false });
            }
        }, 3600000); // 1 hora en milisegundos
    } catch (error) {
        console.error('Error al guardar la cita:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar una cita
citasRouter.delete('/:id', async (request, response) => {
    try {
        const citaId = request.params.id;

        // Verificar si la cita existe
        const cita = await Cita.findById(citaId);
        if (!cita) {
            return response.status(404).json({ error: 'La cita no fue encontrada' });
        }

        // Eliminar la cita de la base de datos
        await Cita.findByIdAndDelete(citaId);

        // Devolver una respuesta exitosa
        return response.status(200).json({ message: 'La cita ha sido eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        return response.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = citasRouter;