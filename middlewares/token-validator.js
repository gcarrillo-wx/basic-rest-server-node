const {response, request} = require("express");
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenValidator = async (req= request, res = response, next) => {
    const token = req.header('Authorization')

    if(!token) {
        return res.status(401).json({
            msg: 'El token es requerido'
        })
    }

    try{
        const { uid } = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await User.findById(uid)
        //Verifica el estatus del usuario logueado.
        //Si es false, lanza una excepcion que sera capturada por el bloque catch
        if (!user || !user.status){
            throw new Error()
        }
        req.authUser = user
        next()
    } catch (error){
        console.log(error)
        res.status(401).json({
            msg: 'Token invalido'
        })
    }
}

module.exports = {
    tokenValidator
}