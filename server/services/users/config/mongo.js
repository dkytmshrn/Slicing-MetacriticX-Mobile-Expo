const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

let db = null

async function mongoInit() {
    try {
        const client = new MongoClient(uri);
        await client.connect()
        db = client.db("users")
        return db
    } catch (error) {
        throw error
    }
}

function getDB() {
    return db
}

module.exports = {mongoInit, getDB}