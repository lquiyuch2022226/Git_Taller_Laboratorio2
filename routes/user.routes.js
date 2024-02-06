const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');

const {
    usuariosPost,
    usuariosGet,
    getUsuarioById,
    putUsuarios,
    usuariosDelete } = require('../controllers/user.controller');

const { existenteEmail,
    esRoleValido,
    existeId } = require('../helpers/db-validators');

const router = Router();

router.get(
    "/: id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeId),
        validarCampos
    ], getUsuarioById
);

router.get("/", usuariosGet);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeId),
        check("role").custom(esRoleValido),
        validarCampos
    ], putUsuarios
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], usuariosPost);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeId),
        validarCampos
    ], usuariosDelete
);

module.exports = router;