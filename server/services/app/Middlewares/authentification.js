const {User} = require('../models')
const { verifyToken } = require('../Helpers/jwt')

async function authentification (req, res, next) {
    try {
        let payload = verifyToken(req.headers.access_token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw {name: "Unauthenticated"}
        }
        req.user = {
            id : user.id,
            username : user.username,
            email : user.email,
            role : user.role
        }
        next()
    } catch (error) {
        next(error)
    }
} 

module.exports = authentification