import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import routerIndex from './controllers/index';
import { PORT, environment } from './config';

const app = express();
// To load env.
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(`Hit at url:${req.url} @ ${req.method}`);
    next()
});

app.use('/v1', routerIndex);

app.use('/ping', (req, res, next)=>{
    res.send({
        'ip':req.ip,
        'method':req.body,
        'body':req.body,
        'time':new Date()
    })
})

try {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server runing at https://0.0.0.0:${PORT} in ${environment}`);
    })
}
catch (e) {
    console.log(`Error occured while creating server ${e}`);
    throw e;
}