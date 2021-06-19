import { Client } from 'pg';
import { getbills_Q, findbill_Q, createbills_Q, findorg_Q, updatebill_Q, deletebill_Q } from '../../Queries/orgDetails/orgbillQuries';
const client = new Client({
    user: 'nick',
    host: 'localhost',
    database: 'billingApp',
    password: 'nick_18',
    port: 5432,
})


class orgbillsRepository {
    async getorgbills(org_id: string) {
        try {
            return await client.query(getbills_Q, [org_id]);
        }
        catch (e) {
            console.log(`Err : OrgBills : Repo :getbills ${e}`);
            throw (e);
        }
    }

    async findorg(org_id: string) {
        try {
            return await client.query(findorg_Q, [org_id]);
        }
        catch (e) {
            console.log(`Err : OrgBills : Repo : findorg ${e}`);
            throw (e);
        }
    }
    async findbill(org_id: string, bill_id: string) {
        try {
            return await client.query(findbill_Q, [org_id, bill_id]);//true or false
        }
        catch (e) {
            console.log(`Err : OrgBills : Repo : findorg ${e}`);
            throw (e);
        }
    }
    async createbill(org_id: string, bill_id: string, bill_amt: number) {
        try {
            const values: any = [org_id, bill_id, bill_amt]
            return await client.query(createbills_Q, values);
        } catch (e) {
            console.log(`Err : OrgBills : Repo : createbill ${e}`);
            throw (e);
        }
    }

    async updatebill(org_id: string, bill_id: string, bill_amt: number) {
        try {
            const values: any = [org_id, bill_id, bill_amt]
            return await client.query(updatebill_Q, values);
        } catch (e) {
            console.log(`Err : OrgBills : Repo : updatebill; ${e}`);
            throw (e);
        }
    }
    async deletebill(bill_id: string) {
        try {
            return await client.query(deletebill_Q, [bill_id]);
        } catch (e) {
            console.log(`Err : OrgBills : Repo : deletebill; ${e}`);
            throw (e);
        }
    }
}
export =orgbillsRepository;