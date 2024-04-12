const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
    service: String,
    duration: String,
    price: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin' // Nombre del modelo del administrador
    },
});

// Define el método toJSON para personalizar la serialización a JSON
servicioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Service = mongoose.model('Service', servicioSchema); 

module.exports = Service;