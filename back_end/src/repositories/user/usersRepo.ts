import { Client } from 'pg';
import { db } from '../../config';
import { createuser_Q, upadatePassword_Q, findUser_Q, deleteuser_Q, getuserDeatils_Q, findperson_Q, getUserById_Q, getuserPassword_Q } from '../../queries/QUsers';
import { ICreateUser, IUser } from '../../contracts/IUser';
const client = new Client({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port
});
client.connect();

class userRepositry {

    async getuserPassword(u_name: string) {
        return await client.query(getuserPassword_Q, [u_name]);
    }

    async findUser(u_name: string): Promise<IUser[]> {
        return (await client.query(findUser_Q, [u_name])).rows
    }

    async findperson(u_name: string): Promise<IUser[]> {
        return (await client.query(findperson_Q, [u_name])).rows
    }

    async createUser(newUser: ICreateUser): Promise<IUser[]> {
        return (await client.query(createuser_Q,
            [newUser.u_name, newUser.u_password, newUser.u_org_name, newUser.u_org_gst, newUser.u_org_address, newUser.isdeleted])).rows;
    }

    async updatePassword(u_name: string, new_password: string) {
        return (await client.query(upadatePassword_Q, [u_name, new_password])).rows;
    }

    async deleteuser(u_name: string): Promise<IUser[]> {
        return (await client.query(deleteuser_Q, [u_name])).rows;
    }

    async userdetails(u_name: string): Promise<IUser[]> {
        return (await client.query(getuserDeatils_Q, [u_name])).rows;
    }

    async getUserById(u_id: string): Promise<IUser[]> {
        return (await client.query(getUserById_Q, [u_id])).rows;
    }
}

export =userRepositry;