import userRepositry from '../../repositories/user/userrepositry';

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
    async login(u_name: string, u_password: string) {
        try {
            const userrepo = new userRepositry();
            const userresults = await userrepo.findUser(u_name);
            if (userresults.rowCount > 0) {
                const userpassword = await userrepo.getuserPassword(u_name);
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
    }
    async createuser(u_name: string, u_password: string) {
        try {
            const userrepo = new userRepositry();
            const userresults = await userrepo.findperson(u_name);
            if (userresults.rowCount == 0) {
                return await userrepo.createUser(u_name, u_password);
            }
            else {
                return userresults;
            }
        }
        catch (e) {
            console.log(`Error occured in userservice while creating new user ${e}`);
            throw e
        }
    }
    async updatepassword(u_name: string, new_password: string) {
        try {
            const userrepo = new userRepositry();
            const userresults = await userrepo.findUser(u_name);
            if (userresults.rowCount == 0) {
                return userresults;
            }
            else {
                return await userrepo.updatePassword(u_name, new_password);
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
            if (result.rowCount == 0)
                return result;
            else {
                return await userrepo.deleteuser(u_name);
            }
        }
        catch (e) {
            console.log(`Error : Ser : deleteuser ${e}`);
            throw (e);
        }
    }
    async userdetails(u_name: string) {
        try {
            const userrepo = new userRepositry();
            let findUserResult = await userrepo.findUser(u_name)
            if (findUserResult.rowCount == 0) {
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