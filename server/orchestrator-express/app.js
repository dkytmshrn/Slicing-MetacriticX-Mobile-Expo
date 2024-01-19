if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const cors = require("cors")
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000
const router = require("./routers/routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})