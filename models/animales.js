const { Schema, model} = require('mongoose');

const AnimalesSchema = Schema({
    tipo:{
        type: String,
        require: [true, 'El tipo de animal es obligatorio']
    },
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    edad:{
        type: Number,
        require: [true, 'La edad es obligatorio']
    },
    cita:{
        type: String,
        require: [true, 'La cita es obligatorio']
    },
    estado:{
        type: String,
        require: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

module.exports = model('Animales', AnimalesSchema);