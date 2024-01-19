async function errorHandler(error, req, res, next) {
    switch (error.name) {
        case "SequelizeUniqueConstraintError" :
            res.status(400).json({message: error.errors.map(el => el.message)})
            break
        case "SequelizeValidationError" :
            res.status(400).json({message: error.errors.map(el => el.message)})
            break
        case "Data not found" :
            res.status(404).json({message: "Data has not found"})
            break
        case "empty input field" :
            res.status(400).json({message: "Input email/password!"})
            break
        case "CanNotOffer" :
            res.status(400).json({message: "Bid offer is below than highest bid!"})
            break
        case "user not registered" :
            res.status(401).json({message: "Wrong email/password!"})
            break
        case "Forbidden":
            res.status(403).json({message: "You are not authorized"})
            break
        case "JsonWebTokenError":
        case "Unauthenticated":
            res.status(401).json({message: "Authentification failed"})
            break
        default:
            res.status(500).json({message: "Internal server error"})
            break
    }
}

module.exports = errorHandler