import { Pool, Client } from 'pg';

// const connectionstring = 'postgresql://nikhil:nick_18@localhost:5432/billingApp';
const client = new Client({
    user: 'nick',
    host: 'localhost',
    database: 'billingApp',
    password: 'nick_18',
    port: 5432,
});

client.connect();

(async function getUserPassword(u_name: string = "nikhil`"): Promise<string[]> {

    try {
        const values = [u_name];
        let res = await client.query('Select u_password from userdetails WHERE u_name=$1 ', values);
        console.log(res.rows);
        return res.rows;
        process.exit(0)
    }
    catch (e) {
        console.log(`Error occured while fetching details in get request ${e}`);
    }
})();

async function finduser(u_name: string): Promise<number> {
    try {
        // let res = await getUserPassword(u_name);
        return 1;
    }
    catch (e) {
        console.log(`Error occured while finding the user ${e}`);
    }
}

async function createuser(u_name: string = "virat", u_password: string = "kohli_18") {
    try {
        let res = await finduser(u_name);
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

};

async function upadatePassword(u_name: string = "nikhil", u_password: string = "17d41a1234") {
    try {
        let res = await finduser(u_name);
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

};
