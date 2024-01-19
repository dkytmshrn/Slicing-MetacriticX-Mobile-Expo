if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require ('express')
const bodyParser = require('body-parser');
const app = express()

const port = Number(process.env.PORT)
const router = require('./routers/routes')
const { mongoInit } = require('./config/mongo')

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(router)

mongoInit()
.then (() => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})
.catch((err) => {
    console.log("Failed connect to db");
    console.log(err);
})