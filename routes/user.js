const { Router } = require('express')
const { getUsers, postUsers, putUsers, deleteUsers } = require("../controllers/user.controller");
const { createValidations, updateValidations, deleteValidations, listValidation} = require("../validations/user");

const router = Router();

router.get('/', listValidation, getUsers)

router.post('/', createValidations, postUsers)

router.put('/:id', updateValidations, putUsers)

router.delete('/:id', deleteValidations, deleteUsers)

module.exports = router