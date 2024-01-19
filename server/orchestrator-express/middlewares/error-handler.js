async function errorHandler(error, req, res, next) {
    switch (error.name) {
        case "AxiosError" :
            res.status(error.response.status).json({message: error.response.data.message})
            break
        default:
            res.status(500).json({message: "Internal server error!"})
            break
    }
}

module.exports = errorHandler