const { Schema, model} = require('mongoose');

const AnimalSchema = Schema({
    tipo:{
        type: String,
        require: [true, 'El tipo de animal es obligatorio']
    },
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    edad:{
        type: String,
        require: [true, 'La edad es obligatoria']
    },
    cita:{
        type: String,
        require: [true, 'La cita es obligatorio']
    },
    estado:{
        type: String,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

module.exports = model('Animales', AnimalSchema);