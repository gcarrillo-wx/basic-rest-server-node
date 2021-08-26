const { request, response } = require('express')

const getUsers =  (req = request, res = response) => {
    const { page = 1, limit = 10, total = 0 } = req.query
    res.status(200).json({
        body: 'Get Users',
        page,
        limit,
        total
    })
}

const postUsers = (req = request, res = response) => {
    const body = req.body
    res.status(200).json({
        body
    })
}

const putUsers = (req = request, res = response) => {
    const id = req.params.id
    res.status(200).json({
        body: 'Put Users',
        id
    })
}

const deleteUsers = (req = request, res = response) => {
    res.status(200).json({
        body: 'Delete Users'
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}
