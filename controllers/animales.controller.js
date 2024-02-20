const Animal = require('../models/animales');
const { response } = require('express');

const animalesPost = async (req, res) =>{
    const {tipo, nombre, edad, cita} = req.body;
    const animal = new Animal({tipo, nombre, edad, cita})

    await animal.save();
    res.status(202).json({
        animal
    });
}

const animalesGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, animales] = await Promise.all([
        Animal.countDocuments(query),
        Animal.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        animales
    });
}

const getAnimalByID = async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findOne({_id: id});

    if (!animal.estado) {
        return res.status(400).json({
             msg: "Este animal fue eliminado" 
        });
    }

    res.status(200).json({
        animal
    });
}

const putAnimales = async (req, res = response) =>{
    const { id } = req.params;
    const { _id, ...resto} = req.body;

    const animal = await Animal.findOne({_id: id});

    if (!animal.estado) {
        return res.status(400).json({
             msg: "Este animal fue eliminado" 
        });
    }
    
    const animalActualizado = await Animal.findByIdAndUpdate(id, resto, { new: true });


    res.status(200).json({
        msg: 'Este animal fue ACTUALIZADO',
        animalActualizado
    });
}

const animalesDelete = async (req, res) => {
    const {id} = req.params;
    const animal = await Animal.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Este animal fue ELIMINADO',
        animal
    });
}

module.exports = {
    animalesPost,
    animalesGet,
    getAnimalByID,
    putAnimales,
    animalesDelete
}