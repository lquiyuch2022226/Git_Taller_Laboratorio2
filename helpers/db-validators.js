const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Animal = require('../models/animales');

const esRoleValido = async (role = '')=>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`EL role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeId = async (id = '')=>{
    const idExiste = await Usuario.findOne({id});
    if(idExiste){
        throw new Error(`El usuario con el id ${ id } no existe`);
    }
}

const existeAnimalId = async (id = '') =>{
    const idAnimalExiste = await Animal.findOne({id});
    if(idAnimalExiste){
        throw new Error(`El animal con el id ${ id } no existe`);
    }
}

module.exports ={
    esRoleValido,
    existenteEmail,
    existeId,
    existeAnimalId
}