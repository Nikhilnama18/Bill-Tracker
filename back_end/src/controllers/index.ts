import express, { Request, Response, NextFunction } from 'express';
import userController from '../controllers/users/usercontroller';
import { NotFoundError, ApiError, InternalError } from '../core/ApiError';
import { environment } from '../config';
import Logger from '../util/logger';

const router = express.Router();

router.use('/users', userController);


// router.use('/org',);

// catch 404 and forward to error handler
router.use((req, res, next) => next(new NotFoundError()));
// Middleware Error Handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        if (environment === 'development') {
            Logger.error(err);
            return res.status(500).send(err.message);
        }
        ApiError.handle(new InternalError(), res);
    }
});

export =router;