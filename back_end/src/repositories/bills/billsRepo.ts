import { Client } from 'pg';
import { IBill, ICreateBill, IUpdateBill } from '../../contracts/IBills';
import { getBills_Q, findBill_Q, createBill_Q, updateBill_Q, deleteBill_Q, updateBillAmmount_Q, updateBillDueAmmount_Q } from '../../queries/QBills';
import { DATABASE_URL, db } from '../../config';

let client: Client;
if (DATABASE_URL) {
    client = new Client({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    client = new Client({
        user: db.user,
        host: db.host,
        database: db.database,
        password: db.password,
        port: db.port,
    });
}
client.connect();

class billsRepository {

    async getOrgBills(user_id: string, org_id: string) {
        return await client.query(getBills_Q, [user_id, org_id]);
    }

    async findBillById(org_id: string, bill_id: string) {
        return (await client.query(findBill_Q, [org_id, bill_id])).rows;
    }

    async updateBill(bill: IUpdateBill) {
        return (await client.query(updateBill_Q,
            [bill.u_id, bill.o_id, bill.b_id, bill.ammount, bill.due_ammount])).rows;
    }

    async updateBillAmmount(bill: IUpdateBill) {
        return (await client.query(updateBillAmmount_Q,
            [bill.u_id, bill.o_id, bill.b_id, bill.ammount])).rows;
    }

    async updateBillDueAmmount(bill: IUpdateBill) {
        return (await client.query(updateBillDueAmmount_Q,
            [bill.u_id, bill.o_id, bill.b_id, bill.due_ammount])).rows;
    }
    /**
       * Creates a new bill and returns it.
       * @param {IBill} org A bill
       * @returns {IBill[]} IBill array
       */
    async createBill(bill: ICreateBill): Promise<IBill[]> {
        return (await client.query(createBill_Q, [bill.o_id, bill.u_id,
        bill.ammount, bill.due_ammount, bill.issue_timestamp, false, new Date(), null])).rows;
    }

    async deletebill(org_id: string, bill_id: string) {
        return (await client.query(deleteBill_Q, [org_id, bill_id])).rows;
    }
}
export = billsRepository;