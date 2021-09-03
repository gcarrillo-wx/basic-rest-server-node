const { check } = require("express-validator");
const { emailExist, roleValidator, userIdExist } = require("../helpers/db-validators");
const { fieldsValidator } = require("../middlewares/fields-validator");
const { tokenValidator } = require("../middlewares/token-validator");
const { isAdmin, hasRole} = require("../middlewares/role-validator");

const listValidation = [
    tokenValidator,
    hasRole('ADMIN'),
]

const createValidations =  [
    tokenValidator,
    isAdmin,
    check('name', 'Nombre es requerido').notEmpty(),
    check('email', 'Correo invalido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'Contraseña requerida').isLength({
        min: 6,
        max: 8
    }),
    check('role', 'Rol invalido').custom( roleValidator ),
    fieldsValidator
]

const updateValidations = [
    tokenValidator,
    isAdmin,
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(userIdExist),
    check('role', 'Rol invalido').custom( roleValidator ),
    fieldsValidator
]

const deleteValidations = [
    tokenValidator,
    // isAdmin,
    hasRole('ADMIN','USER'),
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(userIdExist),
    fieldsValidator
]

module.exports = {
    listValidation,
    createValidations,
    updateValidations,
    deleteValidations
}