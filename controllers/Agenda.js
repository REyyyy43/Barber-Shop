const express = require('express');
const agendaRouter = express.Router();
const Agenda = require('../models/Agenda');

agendaRouter.post('/', async (request, response) => {
    try {
        // Extraer los datos de la solicitud
        const { fecha, hora, servicio, cliente } = request.body;

        // Crear una nueva instancia de Agenda con los datos proporcionados
        const nuevaCita = new Agenda({
            fecha: fecha,
            hora: hora,
            cliente: cliente,
        });

        // Guardar la nueva agenda en la base de datos
        const agendaGuardada = await nuevaAgenda.save();

        // Devolver la agenda guardada como respuesta
        response.status(200).json(agendaGuardada);
    } catch (error) {
        // Manejar cualquier error y devolver una respuesta de error al cliente
        console.error('Error al guardar la agenda:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener todas las citas agendadas
agendaRouter.get('/', async (request, response) => {
    try {
        // Consultar todas las agendas en la base de datos
        const agendas = await Agenda.find();
        // Devolver las agendas como respuesta
        response.status(200).json(agendas);
    } catch (error) {
        // Manejar cualquier error y devolver una respuesta de error al cliente
        console.error('Error al obtener las agendas:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para eliminar una cita agendada por su ID
agendaRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        // Buscar y eliminar la agenda por su ID
        await Agenda.findByIdAndDelete(id);
        // Devolver una respuesta exitosa
        response.status(200).json({ message: 'La cita ha sido eliminada correctamente' });
    } catch (error) {
        // Manejar cualquier error y devolver una respuesta de error al cliente
        console.error('Error al eliminar la agenda:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = agendaRouter;
