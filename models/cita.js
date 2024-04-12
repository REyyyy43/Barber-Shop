const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    date: String,
    hour: String, 
    services: [{
        service: String,
        duration: String,
        price: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reservada: {
        type: Boolean,
        default: false // Por defecto, la cita no está reservada
    },
});

citaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;