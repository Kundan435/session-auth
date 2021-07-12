import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import mongoose from 'mongoose'
import { REDIS_OPTIONS, APP_PORT, MONGO_OPTIONS, MONGO_URI } from './config'
import { createApp } from './app'

(async () => {

    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
        .then(() => console.log('MongoDb Connected...'))
        .catch((err) => console.log(err));


    const RedisStore = connectRedis(session)

    const client = new Redis(REDIS_OPTIONS)

    const store = new RedisStore({ client })

    client.on('connect', () => {
        console.log('Client connected to redis...')
    })

    client.on('ready', () => {
        console.log('Redis is ready to use')
    })

    client.on('error', (err) => {
        console.log(err.message)
    })

    client.on('end', () => {
        console.log('Client disconnected from redis')
    })

    process.on('SIGINT', () => {
        client.quit()
    })

    const app = createApp(store)

    app.get('/', (req, res) => {
        res.send('Hello world')
    })


    app.listen(APP_PORT, () => console.log(`Server running on port http://localhost:${APP_PORT}`))

})()
