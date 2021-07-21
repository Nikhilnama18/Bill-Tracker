import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { jwtkey } from '../config';
import { customRequest } from './customRequest'

const authentication = ((req: Request, res: Response, next: NextFunction) => {
    try {
        // next()

        const token: string = req.headers.authorization ? req.headers.authorization.split(" ")[1] :
            req.body.token ? req.body.token : ''
        let decode: any
        jwt.verify(token, jwtkey, (err, decoded) => {
            if (err) {
                throw err;
            }
            else {
                decode = decoded
            }
            let custom_req = req as customRequest;
            custom_req.decodedToken = decode
            next()
        })

    }
    catch (error) {
        return res.status(401).send({
            status: 'Authentication failed',
            message: 'Token Expired',
            error: JSON.stringify(error.message)
        })
    }
})

export =authentication