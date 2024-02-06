const Animales = require('../models/animales');
const { response } = require('express');

const animalesPost = async (req, res) =>{
    const {tipo, nombre, edad, cita} = req.body;
    const animal = new Animales({tipo, nombre, cita})

    await animal.save();
    res.status(202).json({
        animal
    });
}

module.exports = {
    animalesPost
}