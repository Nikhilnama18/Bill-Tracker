import { Client } from 'pg';
import { createuser_Q, upadatePassword_Q, findUser_Q, deleteuser_Q, getuserPassword_Q, getuserDeatils_Q, findperson_Q } from '../../Queries/QUsers';
import { IUser } from '../../contracts/IUser';
const client = new Client({
    user: 'nick',
    host: 'localhost',
    database: 'billingApp',
    password: 'nick_18',
    port: 5432,
});
client.connect();

class userRepositry {
    async getuserPassword(u_name: string) {
        try {
            return await client.query(getuserPassword_Q, [u_name]);
        }
        catch (e) {
            console.log(`Error :Repo:getuserpassword ${e}`);
            throw (e)
        }
    }
    async findUser(u_name: string): Promise<IUser[]> {
        try {
            return (await client.query(findUser_Q, [u_name])).rows
        }
        catch (e) {
            console.log(`Error :Repo :findUser ${e}`);
            throw (e);
        }

    }
    async findperson(u_name: string): Promise<IUser[]> {
        try {
            return (await client.query(findperson_Q, [u_name])).rows
        }
        catch (e) {
            console.log(`Error:Repo:FindPerson ${e}`);
            throw (e)
        }
    }

    async createUser(u_name: string, u_password: string): Promise<IUser[]> {
        try {
            return (await client.query(createuser_Q, [u_name, u_password])).rows;
        }
        catch (e) {
            console.log(`Error :Repo :createuser ${e}`);
            throw e
        }
    }
    async updatePassword(u_name: string, new_password: string) {
        try {
            return await client.query(upadatePassword_Q, [u_name, new_password]);
        }
        catch (e) {
            console.log(`Error :Rep : updating password ${e}`);
        }
    }
    async deleteuser(u_name: string): Promise<IUser[]> {
        try {
            return (await client.query(deleteuser_Q, [u_name])).rows;
        }
        catch (e) {
            console.log(`Error : Repo : deleteuser ${e}`);
            throw (e);
        }
    }

    async userdetails(u_name: string): Promise<IUser[]> {
        try {
            return (await client.query(getuserDeatils_Q, [u_name])).rows;
        }
        catch (e) {
            console.log(`Err:Repo:userdetails ${e}`);
            throw (e);
        }
    }
}

export =userRepositry;