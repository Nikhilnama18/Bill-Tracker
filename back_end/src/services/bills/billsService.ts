import { ICreateBill } from '../../contracts/IBills';
import { IOrganization } from '../../contracts/IOrganization';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import billsRepository from '../../repositories/bills/billsRepo';
import organizationRepositry from '../../repositories/organizations/organizationsRepo';
class billsService {
    async getbills(org_id: string) {
        try {
            const orgbillsrepo = new billsRepository();
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

    async createbill(bill: ICreateBill) {
        const billsRepo = new billsRepository();
        // Check of org exits.
        const orgRepo = new organizationRepositry();
        const existingOrg: IOrganization[] = await orgRepo.getOrganizationById((bill.u_id).toString(),
            (bill.o_id).toString());
        if (existingOrg.length == 0)
            throw new NotFoundError("Unable to create bill for non-existent organization. Please check and try again.")

        return await billsRepo.createBill(bill);
    }

    async updatebill(org_id: string, bill_id: string, bill_amt: number) {
        try {
            const orgbillsrepo = new billsRepository();
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
            const orgbillsrepo = new billsRepository();
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

export =billsService;