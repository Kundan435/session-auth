export const {
    NODE_ENV = 'development',
    APP_PORT = 4010
} = process.env

export const IN_PROD = NODE_ENV === 'production'