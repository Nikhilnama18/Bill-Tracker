import userRepositry from '../../repositories/user/userrepositry';
import bcrypt from 'bcrypt';
import e from 'express';
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

    //done IUser
    async login(u_name: string, u_password: string) {
        try {
            const userrepo = new userRepositry();
            const userresults = await userrepo.findUser(u_name);
            if (userresults.length > 0) {
                const userpassword = await userrepo.getuserPassword(u_name);
                return await bcrypt.compare(u_password, userpassword.rows[0].u_password);
            }
            else {
                return false;
            }
        }
        catch (e) {
            console.log(`Err : Ser : getpass ${e}`);
            throw (e);
        }
    }
    // done IUser
    async createuser(u_name: string, u_password: string) {
        try {
            const userrepo = new userRepositry();
            const userresults = await userrepo.findperson(u_name);
            if (userresults.length == 0) {
                const hash = await bcrypt.hash(u_password, 10)
                return await userrepo.createUser(u_name, hash);
            }
            else {
                return userresults;
            }
        }
        catch (e) {
            console.log(`Error : userservice: creating new user ${e}`);
            throw e
        }
    }
    async updatepassword(u_name: string, new_password: string) {
        try {
            const userrepo = new userRepositry();
            const userresults = await userrepo.findUser(u_name);
            if (userresults.length == 0) {
                return 0;
            }
            else {
                const hash = await bcrypt.hash(new_password, 10)
                await userrepo.updatePassword(u_name, hash);
                return 1;
            }
        }
        catch (e) {
            console.log(`Error occured in userservice while updating  user password ${e}`);
        }
    }
    async deletuser(u_name: string) {
        try {
            const userrepo = new userRepositry();
            const result = await userrepo.findUser(u_name);
            if (result.length == 0)
                return result;
            else {
                await userrepo.deleteuser(u_name);
                return 1;
            }
        }
        catch (e) {
            console.log(`Error : Ser : deleteuser ${e}`);
            throw (e);
        }
    }
    // added
    async userdetails(u_name: string) {
        try {
            const userrepo = new userRepositry();
            let findUserResult = await userrepo.findUser(u_name)
            if (findUserResult.length == 0) {
                return findUserResult;
            }
            else {
                return await userrepo.userdetails(u_name);
            }
        }
        catch (e) {
            console.log(`Err : Ser : userdetails ${e}`);
            throw (e);
        }
    }
}
export =userService;