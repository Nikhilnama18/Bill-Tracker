"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const userservice_1 = __importDefault(require("../../services/users/userservice"));
const router = express_1.Router();
// router.get('/:u_name', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log(`Hit at baseUrl: ${req.baseUrl} originalUrl: ${req.originalUrl} url:${req.url} @ ${req.method}`);
//         const user_service = new userService();
//         const result = await user_service.getuserPassword(req.body.u_name);
//         // res.status(200).result[0].u_password;
//         if (result.length == 0) {
//             res.status(201).json({
//                 message: 'User Does not exits'
//             })
//         }
//         let pas1: string = req.body.u_password;
//         let pas2: string = result[0].u_password;
//         if (pas1 === pas2) {
//             res.status(200).json({
//                 message: 'Correct password'
//             })
//         }
//         else {
//             res.status(201).json({
//                 message: 'Wrong password'
//             })
//         }
//     }
//     catch (e) {
//         console.log(`Error occured in controller while geting details of password ${e}`);
//     }
// })
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_service = new userservice_1.default();
        let result = yield user_service.login(req.body.u_name, req.body.u_password);
        if (result == 1) {
            res.status(201).json({
                message: 'Auth Sucess'
            });
        }
        else {
            res.status(401).json({
                message: 'Auth Failed'
            });
        }
    }
    catch (e) {
        console.log(`Err: Cont: login  ${e}`);
        throw (e);
    }
}));
router.get('/:u_name', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_service = new userservice_1.default();
        let u_name = req.params.u_name;
        let result = yield user_service.userdetails(u_name);
        if (result.rowCount == 1) {
            res.status(200).json({
                message: "User details are",
                data: result.rows
            });
        }
        else {
            res.status(404).json({
                message: "Auth Failed"
            });
        }
    }
    catch (e) {
        console.log(`Err : Contro : userdetails ${e}`);
        res.status(404).json({ message: e.message });
    }
}));
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_service = new userservice_1.default();
        let result = yield user_service.createuser(req.body.u_name, req.body.u_password);
        if (result.rows.length == 1) {
            res.status(200).json({
                message: "User Already Exist",
            });
        }
        else {
            res.status(200).json({
                message: "New user created",
            });
        }
    }
    catch (e) {
        console.log(`Error : Contoller  :while creating  User ${e}`);
        res.status(404).json({
            e
        });
    }
}));
router.put('/updatepassword', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_service = new userservice_1.default();
        let result = yield user_service.updatepassword(req.body.u_name, req.body.u_password);
        if (result.rowCount == 1) {
            res.status(200).json({
                message: 'User password updated',
            });
        }
        else {
            res.status(300).json({
                message: 'Auth Failed',
            });
        }
    }
    catch (e) {
        console.log(`Error : Controller : UpadatePass  ${e}`);
        throw (e);
    }
}));
router.delete('/deleteuser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_service = new userservice_1.default();
        let result = yield user_service.deletuser(req.body.u_name);
        if (result.rowCount != 0) {
            res.status(200).json({
                message: "user deleted",
            });
        }
        else {
            res.status(200).json({
                message: "Auth Failed",
            });
        }
    }
    catch (e) {
        console.log(`Err: Contro:delete ${e}`);
        throw (e);
    }
}));
module.exports = router;
//# sourceMappingURL=usercontroller.js.map