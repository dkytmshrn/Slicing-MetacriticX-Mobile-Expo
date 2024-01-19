const {getDB} = require('../config/mongo')
const {ObjectId} = require('mongodb')
const {hashPassword} = require('../helpers/bcrypt')

class Users {
    static getCollection() {
        return getDB().collection("users")
    }

    static findAll() {
        return Users.getCollection().find(
            {}, 
            {projection: {password: 0}}
        )
        .toArray()
    }

    static findOne(id) {
        return Users.getCollection().findOne(
            { _id: new ObjectId(id)},
            {projection: {password: 0}}
        )
    }
    
    static create(username, email, password, phoneNumber, address) {
        return Users.getCollection().insertOne({
            username: username,
            email: email,
            password: hashPassword(password),
            role: 'admin',
            phoneNumber: phoneNumber,
            address: address
        })
    }

    static destroy(id) {
        return Users.getCollection().deleteOne({
            _id: new ObjectId(id)
        })
    }

    static findByEmail(email) {
        return Users.getCollection().findOne({
            email: email
        })
    }
}

module.exports = Users