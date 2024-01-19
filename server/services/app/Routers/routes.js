const express = require('express')
const Controller = require('../Controllers/controller')
const router = express.Router()
const errorHandler = require('../Middlewares/errorHandler')

router.post('/login', Controller.login)
router.post('/register', Controller.register)

router.get('/movies', Controller.getAllMovie)
router.post('/movies', Controller.addMovie)
router.get('/movies/:id', Controller.getMovie)
router.put('/movies/:id', Controller.editMovie)
router.delete('/movies/:id', Controller.deleteMovie)

router.get('/genres', Controller.getAllGenre)
router.post('/genres', Controller.addGenre)
router.delete('/genres/:id', Controller.deleteGenre)

router.get('/casts', Controller.getAllCast)

router.use(errorHandler)

module.exports = router