const jwt = require('jsonwebtoken')

//recibe el UID del usuario que se esta logueando
const JWTGenerator = (uid = '') => {
    return new Promise((resolve, reject) => {
        jwt.sign({ uid }, process.env.JWT_SECRET_KEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })
}

module.exports = {
    JWTGenerator
}