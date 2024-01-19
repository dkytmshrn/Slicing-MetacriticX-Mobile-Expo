const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const errorHandler = require('../middlewares/error-handler')

router.get('/users', Controller.getUsers)
router.post('/users', Controller.addUser)
router.get('/users/:id', Controller.getUser)
router.delete('/users/:id', Controller.deleteUser)

router.get('/movies', Controller.getMovies)
router.post('/movies', Controller.addMovie)
router.get('/movies/:id', Controller.getMovie)
router.put('/movies/:id', Controller.editMovie)
router.delete('/movies/:id', Controller.deleteMovie)

router.get('/genres', Controller.getGenres)
router.post('/genres', Controller.addGenre)
router.delete('/genres/:id', Controller.deleteGenre)

router.get('/casts', Controller.getCast)

router.use(errorHandler)

module.exports = router