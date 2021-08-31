const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
        console.log('Conectado a Base de Datos')
    } catch (error) {
        console.log(error)
        throw new Error('Se ha producido un error al conectar la base de datos')
    }
}

module.exports = {
    dbConnection
}