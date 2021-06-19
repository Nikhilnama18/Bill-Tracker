export const getuserPassword_Q = `Select u_password from userdetails where u_name=$1 and isdeleted=false`;
export const createuser_Q = `INSERT INTO  userdetails(u_name,u_password) VALUES ($1,$2)`;
export const upadatePassword_Q = `Update userdetails set u_password =$2 where u_name = $1 and isdeleted=false`;
export const findUser_Q = `select  1 from  userdetails  where u_name =$1 and isdeleted=false;`
export const deleteuser_Q = `update userdetails set isdeleted =true where u_name =$1`;
export const getuserDeatils_Q = `Select * from userdetails where u_name=$1 and isdeleted= false`;
export const findperson_Q=`select  1 from  userdetails  where u_name =$1`;
// export { getuserDeatils_Q, createuser_Q, upadatePassword_Q }; 