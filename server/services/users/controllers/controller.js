const Users = require("../models/users")

class Controller {
    static async getUsers (req, res, next) {
        try {
            const users = await Users.findAll()
            res.status(200).json(users)            
        } catch (error) {
            next(error)
        }
    }

    static async getUser (req, res, next) {
        try {
            const {id} = req.params
            const user = await Users.findOne(id)

            if (!user) {
                throw {name : "NotFound"}
            }

            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async createUser (req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body
            let message = []
            if (!username) {
                message.push('Username is required')
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                message.push('Valid email is required');
            }
            
            if (!password) {
                message.push('Password is required')
            } else if (password) {
                if (password.length < 7 || password.length > 20) {
                    message.push('Password must be 7-20 character')
                }
            }
            
            if (!phoneNumber) {
                message.push('Phone number is required')
            }
            
            if (!address) {
                message.push('Address is required')
            }
            
            if (message.length !== 0) {
                throw {name : "RegistrationError", message}
            }
            
            const findUser = await Users.findByEmail(email)

            if (findUser) {
                throw {name : "DuplicateUser"}
            }

            const user = await Users.create(username, email, password, phoneNumber, address)
            res.status(201).json({message: "Add Success"})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser (req, res, next) {
        try {
            const {id} = req.params
            const user = await Users.findOne(id)
            
            if (!user) {
                throw {name : "NotFound"}
            }

            await Users.destroy(id)

            res.status(200).json({message: "Delete Success"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller