"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findperson_Q = exports.getuserDeatils_Q = exports.deleteuser_Q = exports.findUser_Q = exports.upadatePassword_Q = exports.createuser_Q = exports.getuserPassword_Q = void 0;
exports.getuserPassword_Q = `Select u_password from userdetails where u_name=$1 and isdeleted=false`;
exports.createuser_Q = `INSERT INTO  userdetails(u_name,u_password) VALUES ($1,$2)`;
exports.upadatePassword_Q = `Update userdetails set u_password =$2 where u_name = $1 and isdeleted=false`;
exports.findUser_Q = `select  1 from  userdetails  where u_name =$1 and isdeleted=false;`;
exports.deleteuser_Q = `update userdetails set isdeleted =true where u_name =$1`;
exports.getuserDeatils_Q = `Select * from userdetails where u_name=$1 and isdeleted= false`;
exports.findperson_Q = `select  1 from  userdetails  where u_name =$1`;
// export { getuserDeatils_Q, createuser_Q, upadatePassword_Q }; 
//# sourceMappingURL=userqueries.js.map