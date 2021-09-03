const {response, request} = require("express");

const isAdmin = (req = request, res = response, next) => {
    if(!req.authUser){
        return res.status(500).json({
            msg: 'No existe el usuario que se intenta validar'
        })
    }
    if (req.authUser.role !== 'ADMIN'){
        return res.status(401).json({
            msg: 'El usuario no es administrador'
        })
    }
    next()
}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.authUser){
            return res.status(500).json({
                msg: 'No existe el usuario que se intenta validar'
            })
        }
        if (!roles.includes(req.authUser.role)){
            return res.status(401).json({
                msg: 'El usuario no tiene el role necesario para usar este recurso'
            })
        }
        next()
    }
}

module.exports = {
    isAdmin,
    hasRole
}