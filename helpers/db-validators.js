const Role = require("../models/role");
const User = require("../models/user");

const roleValidator = async (role = '') => {
    const existRole = await Role.findOne({ role })
    if (!existRole){
        throw new Error(`El rol ${ role } no existe`)
    }
}

const emailExist = async(email = '') => {
    const emailExist = await User.findOne({ email })
    if (emailExist){
        throw new Error(`Email ${ email } ya se encuentra registrado`)
    }
}

const userIdExist = async(id = '') => {
    const idExist = await User.findById(id)
    if (!idExist){
        throw new Error(`El ID ${ id } no existe`)
    }
}

module.exports = {
    roleValidator,
    emailExist,
    userIdExist
}