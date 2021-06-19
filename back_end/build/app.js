"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./controllers/index"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use('/', (req, res, next) => {
    console.log(`Hit at url:${req.url} @ ${req.method}`);
    next();
});
app.use('/v1', index_1.default);
try {
    app.listen(3001, "127.0.0.1", () => {
        console.log(`Server runing at https://127.0.0.1:3001`);
    });
}
catch (e) {
    console.log(`Error occured while creating server ${e}`);
    throw e;
}
//# sourceMappingURL=app.js.map