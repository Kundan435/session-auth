import express, { Response, Request, NextFunction } from 'express'
import session, { Store } from 'express-session'
import { register } from './routes'

import { SESSION_OPTIONS } from './config'

export const createApp = (store: Store) => {

    const app = express()

    app.use(express.json())

    app.use(session({
        ...SESSION_OPTIONS,
        store
    }))

    app.use(register)

    app.use((req, res, next) =>
        res.status(404).json({ message: 'Not Found' })
    )

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (!err.status) {
            console.log(err.stack)
        }
        res.status(err.status || 500).json({ message: err.message || 'Internal Server Error!' })
    })

    return app;
}