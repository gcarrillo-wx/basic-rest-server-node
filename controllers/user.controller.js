const { request, response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const getUsers =  async (req = request, res = response) => {
    const { limit=5, start=0  } = req.query

    const filter = { status: true }

    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
            .skip(Number(start))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        users
    })
}

const postUsers = async(req = request, res = response) => {
    const { name, email, password, role  } = req.body

    //create user model
    const user = new User( { name, email, password, role })

    const salt = bcrypt.genSaltSync(15)
    user.password = bcrypt.hashSync(password, salt)

    //save new user
    await user.save()
    res.status(200).json(user)
}

const putUsers = async (req = request, res = response) => {
    const id = req.params.id
    console.log(id)
    //Se excluye el _id del request para no tener un conflicto con el id del registro
    const { _id, email, google, password, ...rest } = req.body

    if (password){
        const salt = bcrypt.genSaltSync(15)
        rest.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest, {
        new: true
    })

    res.status(200).json({
        user
    })
}

const deleteUsers = async (req = request, res = response) => {
    const id = req.params.id
    const userDeleted = await User.findByIdAndUpdate(id, { status: false })

    const authUser = req.authUser

    res.status(200).json({
        userDeleted,
        authUser
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}
