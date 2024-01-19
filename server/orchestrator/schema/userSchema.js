const axios = require('axios')
const BASE_URl_USERS = 'http://52.221.207.113:4001'
const {redis} = require ('../config/redis-config')

const typeDefs = `#graphql
    type User {
        _id: ID
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    type Message {
        message: String
    }

    input NewUser {
        username: String!
        email: String!
        password: String!
        phoneNumber: String!
        address: String!
    }
    
    type Query {
        getUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        addUser(newUser: NewUser): Message
        deleteUser(id: ID): Message
    }
`

const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const usersCache = await redis.get('users:users')
                if (usersCache) {
                    const data = JSON.parse(usersCache)
                    return data    
                } else {
                    const url = BASE_URl_USERS + '/users'
                    const {data} = await axios.get(url)
                    await redis.set('users:users', JSON.stringify(data))
                    return data   
                }
            } catch (error) {
                throw error
            }
        },

        getUser: async (_, args) => {
            try {
                const {id} = args
                const userCache = await redis.get(`users:user:${id}`)
                if (userCache) {
                    const data = JSON.parse(userCache)
                    return data
                } else {
                    const url = BASE_URl_USERS + `/users/${id}`
                    const {data} = await axios.get(url)
                    await redis.set(`users:user:${id}`, JSON.stringify(data))
                    return data            
                }
            } catch (error) {
                throw error
            }
        },

    },

    Mutation: {
        addUser: async (_, args) => {
            try {
                const url = BASE_URl_USERS + '/users'
                const {data} = await axios({
                    method: 'post',
                    url: url,
                    headers: {}, 
                    data: args.newUser
                  })
                await redis.del(`users:users`)
                return data           
            } catch (error) {
                throw error
            }
        },

        deleteUser: async (_, args) => {
            try {
                const {id} = args
                const url = BASE_URl_USERS + `/users/${id}`
                const {data} = await axios.delete(url)
                await redis.del(`users:user:${id}`)
                await redis.del(`users:users`)
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