const { Router } = require('express');
const { check } = require('express-validator');

const {
    animalesPost,
    animalesGet,
    getAnimalByID, 
    putAnimales,
    animalesDelete } = require('../controllers/animales.controller');

const { validarCampos,  } = require('../middlewares/validar_campos');

const { existeAnimalId } = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check("tipo", "El tipo no puede estar vacío").not().isEmpty(),
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("edad", "La edad no puede ir vacía").not().isEmpty(),
        check("cita", "La cita no puede estar vacía").not().isEmpty(),
        validarCampos
    ], animalesPost);

router.get("/", animalesGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAnimalId),
        validarCampos
    ], getAnimalByID);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAnimalId),
        validarCampos
    ], putAnimales);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeAnimalId),
        validarCampos
    ], animalesDelete);

module.exports = router;

