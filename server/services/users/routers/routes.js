const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const errorHandler = require('../middlewares/error-handler')

router.get('/users', Controller.getUsers)
router.post('/users', Controller.createUser)
router.get('/users/:id', Controller.getUser)
router.delete('/users/:id', Controller.deleteUser)

router.use(errorHandler)

module.exports = router