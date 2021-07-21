import Express from 'express'
export interface customRequest extends Express.Request {
    decodedToken: string | object
}