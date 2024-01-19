const Redis = require('ioredis')
const redis = new Redis({
    port: 15974,
    host: "redis-15974.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
    username: "default",
    password: process.env.REDIS_PASSWORD,
  })

module.exports = {redis}  