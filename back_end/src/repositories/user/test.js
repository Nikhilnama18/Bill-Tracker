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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pg_1 = require("pg");
// const connectionstring = 'postgresql://nikhil:nick_18@localhost:5432/billingApp';
var client = new pg_1.Client({
    user: 'nick',
    host: 'localhost',
    database: 'billingApp',
    password: 'nick_18',
    port: 5432
});
client.connect();
(function getUserPassword(u_name) {
    if (u_name === void 0) { u_name = "nikhil"; }
    return __awaiter(this, void 0, void 0, function () {
        var values, res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    values = [u_name];
                    return [4 /*yield*/, client.query('Select u_password from userdetails WHERE u_name=$1 ', values)];
                case 1:
                    res = _a.sent();
                    console.log(res.rows);
                    return [2 /*return*/, res.rows];
                case 2:
                    e_1 = _a.sent();
                    console.log("Error occured while fetching details in get request " + e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
function finduser(u_name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // let res = await getUserPassword(u_name);
                return [2 /*return*/, 1];
            }
            catch (e) {
                console.log("Error occured while finding the user " + e);
            }
            return [2 /*return*/];
        });
    });
}
function createuser(u_name, u_password) {
    if (u_name === void 0) { u_name = "virat"; }
    if (u_password === void 0) { u_password = "kohli_18"; }
    return __awaiter(this, void 0, void 0, function () {
        var res, values, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, finduser(u_name)];
                case 1:
                    res = _a.sent();
                    if (res)
                        console.log("User Already exits ");
                    else {
                        values = [u_name, u_password];
                        result = client.query('INSERT INTO  userdetails(u_name,u_password) VALUES ($1,$2)', values);
                        console.log('User added to database');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.log("Error occured while creating a user " + e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
function upadatePassword(u_name, u_password) {
    if (u_name === void 0) { u_name = "nikhil"; }
    if (u_password === void 0) { u_password = "17d41a1234"; }
    return __awaiter(this, void 0, void 0, function () {
        var res, values, results, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, finduser(u_name)];
                case 1:
                    res = _a.sent();
                    if (res > 0) {
                        values = [u_name, u_password];
                        results = client.query('Update userdetails set u_password =$2 where u_name = $1', values);
                        console.log(results);
                    }
                    else
                        console.log('User does not exits ');
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    console.log("Error occured while updating password " + e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
