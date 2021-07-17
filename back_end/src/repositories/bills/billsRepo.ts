import { Client } from 'pg';
import { IBill, ICreateBill } from '../../contracts/IBills';
import { getBills_Q, findbill_Q, createBill_Q, updatebill_Q, deletebill_Q } from '../../Queries/QBills';
const client = new Client({
    user: 'nick',
    host: 'localhost',
    database: 'billingApp',
    password: 'nick_18',
    port: 5432,
})
client.connect();

class billsRepository {
    async getOrgBills(user_id: string, org_id: string) {
        return await client.query(getBills_Q, [user_id, org_id]);
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

    async updatebill(org_id: string, bill_id: string, bill_amt: number) {
        try {
            const values: any = [org_id, bill_id, bill_amt]
            return await client.query(updatebill_Q, values);
        } catch (e) {
            console.log(`Err : OrgBills : Repo : updatebill; ${e}`);
            throw (e);
        }
    }

    /**
       * Creates a new bill and returns it.
       * @param {IBill} org A bill
       * @returns {IBill[]} IBill array
       */
    async createBill(bill: ICreateBill): Promise<IBill[]> {
        try {
            return (await client.query(createBill_Q, [bill.o_id, bill.u_id,
            bill.ammount, bill.due_ammount, bill.issue_timestamp, false, new Date(), null])).rows;
        }
        catch (e) {
            console.log(e)
            throw e
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
export = billsRepository;