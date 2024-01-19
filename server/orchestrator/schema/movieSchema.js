const axios = require('axios')
const BASE_URl_USERS = 'http://52.221.207.113:4001'
const BASE_URl_PRODUCTS = 'http://52.221.207.113:4002'
const {redis} = require ('../config/redis-config')

const typeDefs = `#graphql
    type Movie {
        id: ID
        title: String
        slug: String
        synopsis: String 
        trailerUrl: String
        imgUrl: String
        rating: Int
        GenreId: ID
        AuthorId: ID
        Casts: [Cast]
        Genre: Genre
    }

    type MovieDetail {
        id: ID
        title: String
        slug: String
        synopsis: String 
        trailerUrl: String
        imgUrl: String
        rating: Int
        GenreId: ID
        AuthorId: ID
        Casts: [Cast]
        Genre: Genre
        Author: Author
    }

    type Author {
        username: String
        email: String
    }

    type Cast {
        id: ID
        MovieId: Int
        name: String
        profilePict: String
    }

    type Genre {
        name: String
    }

    type Message {
        message: String
    }

    input NewMovie {
        title: String!
        synopsis: String! 
        trailerUrl: String!
        imgUrl: String!
        rating: Int!
        GenreId: ID!
        Casts: [newCast]
    }

    input newCast {
        name: String!
        profilePict: String!
    }
    
    type Query {
        getMovies: [Movie]
        getMovie(id: ID): MovieDetail
    }

    type Mutation {
        addMovie(newMovie: NewMovie): Message
        editMovie(id: ID, editData: NewMovie): Message
        deleteMovie(id: ID): Message
    }
`

const resolvers = {
    Query: {
        getMovies: async () => {
            try {
                const moviesCache = await redis.get('app:movies')
                if (moviesCache) {
                    const data = JSON.parse(moviesCache)
                    return data  
                } else {
                    const url = BASE_URl_PRODUCTS + '/movies'
                    const {data} = await axios.get(url)
                    await redis.set('app:movies', JSON.stringify(data))
                    return data           
                }
            } catch (error) {
                throw error
            }
        },

        getMovie: async (_, args) => {
            try {
                const {id} = args
                const movieCache = await redis.get(`app:movie:${id}`)
                if (movieCache) {
                    const data = JSON.parse(movieCache)
                    return data
                } else {
                    const url = BASE_URl_PRODUCTS + `/movies/${id}`
                    const {data} = await axios.get(url)
                    
                    const authorId = data.AuthorId
                    const usersUrl = BASE_URl_USERS + `/users/${authorId}`
                    const userData = await axios.get(usersUrl)
                    
                    data.Author = userData.data
                    await redis.set(`app:movie:${id}`, JSON.stringify(data))
    
                    return data       
                }
            } catch (error) {
                throw error
            }
        }
    },

    Mutation: {
        addMovie: async (_, args) => {
            try {
                const url = BASE_URl_PRODUCTS + '/movies'
                const {data} = await axios({
                    method: 'post',
                    url: url,
                    headers: {}, 
                    data: args.newMovie
                  })
                await redis.del(`app:movies`)
                return data           
            } catch (error) {
                throw error
            }
        },

        editMovie: async (_, args) => {
            try {
                const {id} = args
                const url = BASE_URl_PRODUCTS + `/movies/${id}`
                const {data} = await axios({
                    method: 'put',
                    url: url,
                    headers: {}, 
                    data: args.editData
                  })
                await redis.del(`app:movies`)
                await redis.del(`app:movie:${id}`)
                return data            
            } catch (error) {
                throw error
            }
        },

        deleteMovie: async (_, args) => {
            try {
                const {id} = args
                const url = BASE_URl_PRODUCTS + `/movies/${id}`
                const {data} = await axios.delete(url)
                await redis.del(`app:movies`)
                await redis.del(`app:movie:${id}`)
                return data
            } catch (error) {
                throw error
            }
        },
    }
}

module.exports = {
    typeDefs,
    resolvers
}