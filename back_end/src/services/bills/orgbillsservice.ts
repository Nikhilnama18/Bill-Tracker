import orgbillsRepository from '../../repositories/bills/orgbillsrepository';
class orgbillsService {
    async getbills(org_id: string) {
        try {
            const orgbillsrepo = new orgbillsRepository();
            const findorg = await orgbillsrepo.findorg(org_id);
            if (findorg.rowCount > 0) {
                return await orgbillsrepo.getorgbills(org_id);
            }
            else {
                return findorg;
            }
        } catch (e) {
            console.log(`Err : Orgbill :Ser : getbill ${e} `);
            throw (e);
        }

    }
    async createbill(org_id: string, bill_id: string, bill_amt: number) {
        try {
            const orgbillsrepo = new orgbillsRepository();
            const findbill = await orgbillsrepo.findbill(org_id, bill_id);
            if (findbill.rowCount == 0) {
                return await orgbillsrepo.createbill(org_id, bill_id, bill_amt);
            }
            else {
                return findbill;
            }
        } catch (e) {
            console.log(`Err : Orgbill :Ser : createbill ${e} `);
            throw (e);
        }
    }

    async updatebill(org_id: string, bill_id: string, bill_amt: number) {
        try {
            const orgbillsrepo = new orgbillsRepository();
            const findbill = await orgbillsrepo.findbill(org_id, bill_id);
            if (findbill.rowCount > 0) {
                return await orgbillsrepo.updatebill(org_id, bill_id, bill_amt);
            }
            else {
                return findbill;
            }
        } catch (e) {
            console.log(`Err : Orgbill :Ser : updatebill ${e} `);
            throw (e);
        }
    }
    async deletebill(org_id: string, bill_id: string) {
        try {
            const orgbillsrepo = new orgbillsRepository();
            const findbill = await orgbillsrepo.findbill(org_id, bill_id);
            if (findbill.rowCount > 0) {
                return await orgbillsrepo.deletebill(bill_id);
            }
            else {
                return findbill;
            }
        } catch (e) {
            console.log(`Err : Orgbill :Ser : deletebill ${e} `);
            throw (e);
        }
    }
}

export =orgbillsService;