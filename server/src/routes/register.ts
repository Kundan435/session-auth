import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { logIn } from '../auth'
import { BadRequest } from '../errors'
import { guest } from '../middleware'
import { catchAsync } from '../middleware/error'
import { User } from '../models'
import { registerSchema, validate } from '../validation'

const router = Router()

router.post('/register', guest, asyncHandler(async (req, res) => {

    await validate(registerSchema, req.body)

    // await registerSchema.validateAsync(req.body, { abortEarly: false })



    // try {
    //     await schema.validateAsync(payload, { abortEarly: false })
    // } catch (e) {
    //     throw new BadRequest(e)
    // }
    const { email, name, password } = req.body

    const found = await User.exists({ email })

    if (found) {
        throw new BadRequest('Invalid email')
    }

    const user = await User.create({
        email, name, password
    })

    logIn(req, user.id)

    res.json({ message: 'ok' })
}))

export default router