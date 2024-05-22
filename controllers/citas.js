const express = require('express');
const citasRouter = express.Router();
const Cita = require('../models/cita');
const User = require('../models/user');

// Obtener todas las citas de un usuario específico o todas las citas si el usuario es administrador
citasRouter.get('/', async (request, response) => {
    try {
        const user = request.user;
        let citas;

        if (user.role === 'admin') {
            citas = await Cita.find().populate('user', 'name email phone');
        } else {
            citas = await Cita.find({ user: user._id }).populate('user', 'name email phone');
        }

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

        const citaExists = await Cita.findOne({ date, hour });
        if (citaExists && citaExists.reservada) {
            return response.status(400).json({ error: 'La fecha y hora seleccionadas no están disponibles. Por favor, elige otra.' });
        }

        const newCita = new Cita({
            date,
            hour,
            services: services.map(service => ({
                service: service.service,
                duration: service.duration,
                price: service.price
            })),
            totalPrice,
            user: user._id,
            reservada: true
        });

        const savedCita = await newCita.save();

        user.citas.push(savedCita._id);
        await user.save();

        response.status(200).json({ cita: savedCita });

        setTimeout(async () => {
            savedCita.finished = true;
            await savedCita.save();

            const activeCitas = await Cita.find({ date: savedCita.date, hour: savedCita.hour, reservada: true });
            if (activeCitas.length === 1) {
                await Cita.updateMany({ date: savedCita.date, hour: savedCita.hour }, { reservada: false });
            }
        }, 3600000);
    } catch (error) {
        console.error('Error al guardar la cita:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar una cita
citasRouter.delete('/:id', async (request, response) => {
    try {
        const citaId = request.params.id;
        const cita = await Cita.findById(citaId);
        if (!cita) {
            return response.status(404).json({ error: 'La cita no fue encontrada' });
        }

        await Cita.findByIdAndDelete(citaId);
        return response.status(200).json({ message: 'La cita ha sido eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        return response.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = citasRouter;