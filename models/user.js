const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'DB: El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'DB: El email es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'DB: El password es requerido']
    },
    img: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['ADMIN','USER'],
        required: true
    }
})


userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject()
    user.uid = _id
    return user
}

module.exports = model('User', userSchema)