const {response} = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const { JWTGenerator } = require('../helpers/jwt-generator')

const login = async (req, res = response) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email, status: true})

        if (!user) {
            return res.status(400).json({
                msg: "Email no encontrado"
            })
        }

        const passwordMatchValidation = bcrypt.compareSync(password, user.password)

        if (!passwordMatchValidation) {
            return res.status(400).json({
                msg: "la contraseña es incorrecta"
            })
        }

        const token = await JWTGenerator(user.id)

        res.status(200).send({
            user,
            token
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            msg: "Se ha producido un error en el servidor"
        })
    }
}

module.exports = {
    login
}