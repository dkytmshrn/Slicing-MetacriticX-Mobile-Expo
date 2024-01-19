const { Sell } = require('../models')

async function authorization (req, res, next) {
    try {
        const {id} = req.params
        const sellPost = await Sell.findByPk(id)

        if (!sellPost) {
            throw {name : "Data not found"}
        }

        if (req.user.id === sellPost.UserId ) {
            next()
        } else {
            throw {name : "Forbidden"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization