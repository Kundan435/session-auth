import { model, Schema, Document } from 'mongoose'
import session from 'express-session';
import { NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { BCRYPT_WORK_FACTOR } from '../config/auth';

interface UserDocument extends Document {
    email: string
    name: string
    password: string
}

declare module 'express-session' {
    export interface SessionData {
        userId: string
    }
}

const userSchema = new Schema({
    email: String,
    name: String,
    password: String
}, { timestamps: true })

// userSchema.pre<UserDocument>('save', async function () {
//     if (this.isModified('password')) {
//         this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
//     }
// })

export const User = model<UserDocument>('User', userSchema)