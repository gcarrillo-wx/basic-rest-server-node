const { Router } = require('express')
const { check, header } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fields-validator");
const { login } = require('../controllers/auth.controller')

const router = Router();

router.post('/login',[
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Contraseña es requerida').notEmpty(),
    fieldsValidator
], login)

module.exports = router