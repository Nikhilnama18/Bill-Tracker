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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// const connectionstring = 'postgresql://nikhil:nick_18@localhost:5432/billingApp';
const client = new pg_1.Client({
    user: 'nick',
    host: 'localhost',
    database: 'billingApp',
    password: 'nick_18',
    port: 5432,
});
client.connect();
(function getUserPassword(u_name = "nikhil`") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const values = [u_name];
            let res = yield client.query('Select u_password from userdetails WHERE u_name=$1 ', values);
            console.log(res.rows);
            return res.rows;
            process.exit(0);
        }
        catch (e) {
            console.log(`Error occured while fetching details in get request ${e}`);
        }
    });
})();
function finduser(u_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // let res = await getUserPassword(u_name);
            return 1;
        }
        catch (e) {
            console.log(`Error occured while finding the user ${e}`);
        }
    });
}
function createuser(u_name = "virat", u_password = "kohli_18") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield finduser(u_name);
            if (res)
                console.log(`User Already exits `);
            else {
                const values = [u_name, u_password];
                let result = client.query('INSERT INTO  userdetails(u_name,u_password) VALUES ($1,$2)', values);
                console.log('User added to database');
            }
        }
        catch (e) {
            console.log(`Error occured while creating a user ${e}`);
        }
    });
}
;
function upadatePassword(u_name = "nikhil", u_password = "17d41a1234") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield finduser(u_name);
            if (res > 0) {
                let values = [u_name, u_password];
                let results = client.query('Update userdetails set u_password =$2 where u_name = $1', values);
                console.log(results);
            }
            else
                console.log('User does not exits ');
        }
        catch (e) {
            console.log(`Error occured while updating password ${e}`);
        }
    });
}
;
//# sourceMappingURL=test.js.map