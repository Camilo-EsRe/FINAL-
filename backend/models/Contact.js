const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String
    },
    telefonoFijo: {
        type: String
    },
    celular: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', ContactSchema);