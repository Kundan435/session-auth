
import { ConnectionOptions } from 'mongoose'

const {
    MONGO_USERNAME = 'admin',
    MONGO_PASSWORD = 'secret',
    MONGO_HOST = 'localhost',
    MONGO_PORT = 27017,
    MONGO_DATABASE = 'auth'
} = process.env

// export const MONGO_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)
//     }@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

export const MONGO_URI = 'mongodb://localhost:27017/auth'

export const MONGO_OPTIONS: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// export const connectDB = async () => {
//     try {
//         console.log(MONGO_URI, MONGO_PASSWORD)
//         mongoose.connect(MONGO_URI, MONGO_OPTIONS)

//         console.log(`Database Connected: ${MONGO_URI}`)

//     } catch (error) {
//         console.error(`Error: ${error.message}`)
//         process.exit(1)
//     }
// }

