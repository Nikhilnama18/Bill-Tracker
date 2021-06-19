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
const userrepositry_1 = __importDefault(require("../../repositories/user/userrepositry"));
class userService {
    // async getuserPassword(u_name: string) {
    //     try {
    //         const userrepo = new userRepositry();
    //         const userresults = await userrepo.findUser(u_name);
    //         if (userresults.rowCount == 0) {
    //             return userresults;
    //         }
    //         else {
    //             return await userrepo.getuserPassword(u_name);
    //         }
    //     }
    //     catch (e) {
    //         console.log(`Error occured in userservice while fetching password ${e}`);
    //     }
    // }
    login(u_name, u_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userrepo = new userrepositry_1.default();
                const userresults = yield userrepo.findUser(u_name);
                if (userresults.rowCount > 0) {
                    const userpassword = yield userrepo.getuserPassword(u_name);
                    const pass2 = userpassword.rows[0].u_password;
                    if (u_password == pass2) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 0;
                }
            }
            catch (e) {
                console.log(`Err : Ser : getpass ${e}`);
                throw (e);
            }
        });
    }
    createuser(u_name, u_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userrepo = new userrepositry_1.default();
                const userresults = yield userrepo.findperson(u_name);
                if (userresults.rowCount == 0) {
                    return yield userrepo.createUser(u_name, u_password);
                }
                else {
                    return userresults;
                }
            }
            catch (e) {
                console.log(`Error occured in userservice while creating new user ${e}`);
                throw e;
            }
        });
    }
    updatepassword(u_name, new_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userrepo = new userrepositry_1.default();
                const userresults = yield userrepo.findUser(u_name);
                if (userresults.rowCount == 0) {
                    return userresults;
                }
                else {
                    return yield userrepo.updatePassword(u_name, new_password);
                }
            }
            catch (e) {
                console.log(`Error occured in userservice while updating  user password ${e}`);
            }
        });
    }
    deletuser(u_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userrepo = new userrepositry_1.default();
                const result = yield userrepo.findUser(u_name);
                if (result.rowCount == 0)
                    return result;
                else {
                    return yield userrepo.deleteuser(u_name);
                }
            }
            catch (e) {
                console.log(`Error : Ser : deleteuser ${e}`);
                throw (e);
            }
        });
    }
    userdetails(u_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userrepo = new userrepositry_1.default();
                let findUserResult = yield userrepo.findUser(u_name);
                if (findUserResult.rowCount == 0) {
                    return findUserResult;
                }
                else {
                    return yield userrepo.userdetails(u_name);
                }
            }
            catch (e) {
                console.log(`Err : Ser : userdetails ${e}`);
                throw (e);
            }
        });
    }
}
module.exports = userService;
//# sourceMappingURL=userservice.js.map