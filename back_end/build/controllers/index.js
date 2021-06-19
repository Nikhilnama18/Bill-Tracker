"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const usercontroller_1 = __importDefault(require("../controllers/users/usercontroller"));
const router = express_1.default.Router();
router.use('/user', usercontroller_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map