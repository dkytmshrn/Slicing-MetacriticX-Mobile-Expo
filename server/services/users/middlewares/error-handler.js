async function errorHandler(error, req, res, next) {
    switch (error.name) {
        case "NotFound" :
            res.status(404).json({message: "Data Not Found!"})
            break
        case "RegistrationError" :
            res.status(400).json({message: error.message.map(el => el + '!')})
            break
        case "DuplicateUser" :
            res.status(400).json({message: "Email is already used!"})
            break
        default:
            res.status(500).json({message: "Internal server error!"})
            break
    }
}

module.exports = errorHandler