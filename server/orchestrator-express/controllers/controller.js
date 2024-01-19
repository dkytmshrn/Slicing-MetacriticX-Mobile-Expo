const axios = require('axios')
const BASE_URl_USERS = 'http://localhost:4001'
const BASE_URl_PRODUCTS = 'http://localhost:4002'
const {redis} = require ('../config/redis-config')

class Controller {
    static async getUsers (req, res, next) {
        try {
            const usersCache = await redis.get('users:users')
            if (usersCache) {
                const data = JSON.parse(usersCache)
                res.status(200).json(data)    
            } else {
                const url = BASE_URl_USERS + '/users'
                const {data} = await axios.get(url)
                await redis.set('users:users', JSON.stringify(data))
                res.status(200).json(data)    
            }
        } catch (error) {
            next(error)
        }
    }

    static async getUser (req, res, next) {
        try {
            const {id} = req.params
            const userCache = await redis.get(`users:user:${id}`)
            if (userCache) {
                const data = JSON.parse(userCache)
                res.status(200).json(data) 
            } else {
                const url = BASE_URl_USERS + `/users/${id}`
                const {data} = await axios.get(url)
                await redis.set(`users:user:${id}`, JSON.stringify(data))
                res.status(200).json(data)            
            }
        } catch (error) {
            next(error)
        }
    }

    static async addUser (req, res, next) {
        try {
            const url = BASE_URl_USERS + '/users'
            const {data} = await axios({
                method: 'post',
                url: url,
                headers: {}, 
                data: req.body
              })
              
            await redis.del(`users:users`)
            res.status(201).json(data)            
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser (req, res, next) {
        try {
            const {id} = req.params
            const url = BASE_URl_USERS + `/users/${id}`
            const {data} = await axios.delete(url)
            await redis.del(`users:user:${id}`)
            await redis.del(`users:users`)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getMovies (req, res, next) {
        try {
            const moviesCache = await redis.get('app:movies')
            if (moviesCache) {
                const data = JSON.parse(moviesCache)
                res.status(200).json(data)  
            } else {
                const url = BASE_URl_PRODUCTS + '/movies'
                const {data} = await axios.get(url)
                await redis.set('app:movies', JSON.stringify(data))
                res.status(200).json(data)            
            }
        } catch (error) {
            next(error)
        }
    }

    static async getMovie (req, res, next) {
        try {
            const {id} = req.params
            const movieCache = await redis.get(`app:movie:${id}`)
            if (movieCache) {
                const data = JSON.parse(movieCache)
                res.status(200).json(data)
            } else {
                const url = BASE_URl_PRODUCTS + `/movies/${id}`
                const {data} = await axios.get(url)
                
                const authorId = data.AuthorId
                const usersUrl = BASE_URl_USERS + `/users/${authorId}`
                const userData = await axios.get(usersUrl)
                
                data.Author = userData.data
                await redis.set(`app:movie:${id}`, JSON.stringify(data))

                res.status(200).json(data)            
            }
        } catch (error) {
            next(error)
        }
    }

    static async addMovie (req, res, next) {
        try {
            const url = BASE_URl_PRODUCTS + '/movies'
            const {data} = await axios({
                method: 'post',
                url: url,
                headers: {}, 
                data: req.body
              })
            await redis.del(`app:movies`)
            res.status(201).json({message : "Add Success"})            
        } catch (error) {
            next(error)
        }
    }

    static async editMovie (req, res, next) {
        try {
            const {id} = req.params
            const url = BASE_URl_PRODUCTS + `/movies/${id}`
            const {data} = await axios({
                method: 'put',
                url: url,
                headers: {}, 
                data: req.body
              })
            await redis.del(`app:movies`)
            await redis.del(`app:movie:${id}`)
            res.status(201).json({message : "Edit Success"})            
        } catch (error) {
            next(error)
        }
    }

    static async deleteMovie (req, res, next) {
        try {
            const {id} = req.params
            const url = BASE_URl_PRODUCTS + `/movies/${id}`
            const {data} = await axios.delete(url)
            await redis.del(`app:movies`)
            await redis.del(`app:movie:${id}`)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getGenres (req, res, next) {
        try {
            const genreCache = await redis.get(`app:genres`)
            if (genreCache) {
                const data = JSON.parse(genreCache)
                res.status(200).json(data)
            } else {
                const url = BASE_URl_PRODUCTS + '/genres'
                const {data} = await axios.get(url)
                await redis.set(`app:genres`)
                res.status(200).json(data)            
            }
        } catch (error) {
            next(error)
        }
    }

    static async addGenre (req, res, next) {
        try {
            const url = BASE_URl_PRODUCTS + '/genres'
            const {data} = await axios({
                method: 'post',
                url: url,
                headers: {}, 
                data: req.body
              })
            await redis.del(`app:genres`)
            res.status(201).json(data)            
        } catch (error) {
            next(error)
        }
    }

    static async deleteGenre (req, res, next) {
        try {
            const {id} = req.params
            const url = BASE_URl_PRODUCTS + `/genres/${id}`
            const {data} = await axios.delete(url)
            await redis.del(`app:genres`)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getCast (req, res, next) {
        try {
            const castCache = await redis.get(`app:cast`)
            if (castCache) {
                const data = JSON.parse(castCache)
                res.status(200).json(data)
            } else {
                const url = BASE_URl_PRODUCTS + '/casts'
                const {data} = await axios.get(url)
                await redis.set(`app:cast`)
                res.status(200).json(data)            
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller