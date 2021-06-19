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
const pg_1 = require("pg");
const userqueries_1 = require("../../Queries/users/userqueries");
const client = new pg_1.Client({
    user: 'nick',
    host: 'localhost',
    database: 'billingApp',
    password: 'nick_18',
    port: 5432,
});
client.connect();
class userRepositry {
    getuserPassword(u_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client.query(userqueries_1.getuserPassword_Q, [u_name]);
            }
            catch (e) {
                console.log(`Error occured while fetching userpassword in get request ${e}`);
                throw (e);
            }
        });
    }
    findUser(u_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client.query(userqueries_1.findUser_Q, [u_name]);
            }
            catch (e) {
                console.log(`Error occured while finding the user ${e}`);
                throw (e);
            }
        });
    }
    findperson(u_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client.query(userqueries_1.findperson_Q, [u_name]);
            }
            catch (e) {
                console.log(`Error occured while finding the user ${e}`);
                throw (e);
            }
        });
    }
    createUser(u_name, u_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client.query(userqueries_1.createuser_Q, [u_name, u_password]);
            }
            catch (e) {
                console.log(`Error while creating a user ${e}`);
                throw e;
            }
        });
    }
    updatePassword(u_name, new_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client.query(userqueries_1.upadatePassword_Q, [u_name, new_password]);
            }
            catch (e) {
                console.log(`Error occured while updating password ${e}`);
            }
        });
    }
    deleteuser(u_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client.query(userqueries_1.deleteuser_Q, [u_name]);
            }
            catch (e) {
                console.log(`Error : Repo : deleteuser ${e}`);
                throw (e);
            }
        });
    }
    userdetails(u_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client.query(userqueries_1.getuserDeatils_Q, [u_name]);
            }
            catch (e) {
                console.log(`Err:Repo:userdetails ${e}`);
                throw (e);
            }
        });
    }
}
module.exports = userRepositry;
//# sourceMappingURL=userrepositry.js.map