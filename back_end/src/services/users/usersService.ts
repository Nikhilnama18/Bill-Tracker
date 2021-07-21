import userRepositry from '../../repositories/user/usersRepo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { AuthFailureError, BadRequestError, NotFoundError } from '../../core/ApiError';
import { jwtkey } from '../../config'
import { ILoginResponse } from '../../contracts/IUser';
class userService {

    async login(u_name: string, u_password: string): Promise<ILoginResponse> {
        const userrepo = new userRepositry();
        const userresults = await userrepo.findUser(u_name);
        if (userresults.length == 0) {
            new NotFoundError()
        }
        const userpassword = await userrepo.getuserPassword(u_name);
        const result = await bcrypt.compare(u_password, userpassword.rows[0].u_password);
        if (result == false) {
            throw new AuthFailureError()
        }
        const token: string = await jwt.sign({ id: userresults[0].u_id }, jwtkey, { expiresIn: 6000 })
        return {
            u_id: userresults[0].u_id,
            auth: result,
            token: token,
        }
    }


    async createuser(u_name: string, u_password: string) {
        const userrepo = new userRepositry();
        const userresults = await userrepo.findperson(u_name);
        if (userresults.length == 1) {
            throw new BadRequestError('User Already Exits');
        }
        const hash = await bcrypt.hash(u_password, 10)
        return await userrepo.createUser(u_name, hash);
    }


    async updatepassword(u_name: string, new_password: string) {
        const userrepo = new userRepositry();
        const userresults = await userrepo.findUser(u_name);
        if (userresults.length == 0) {
            return userresults;
        }
        else {
            const hash = await bcrypt.hash(new_password, 10)
            return await userrepo.updatePassword(u_name, hash);
        }
    }

    async deletuser(u_name: string) {
        const userrepo = new userRepositry();
        const result = await userrepo.findUser(u_name);
        if (result.length == 0)
            return result;
        else {
            return await userrepo.deleteuser(u_name);
        }
    }
    // added
    async userdetails(u_name: string) {
        const userrepo = new userRepositry();
        let findUserResult = await userrepo.findUser(u_name)
        if (findUserResult.length == 0) {
            return findUserResult;
        }
        else {
            return await userrepo.userdetails(u_name);
        }
    }
}
export =userService;