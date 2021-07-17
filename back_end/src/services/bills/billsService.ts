import { IBill, ICreateBill } from '../../contracts/IBills';
import { IOrganization } from '../../contracts/IOrganization';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import billsRepository from '../../repositories/bills/billsRepo';
import organizationRepositry from '../../repositories/organizations/organizationsRepo';
import userRepositry from '../../repositories/user/usersRepo';
class billsService {
    async getBills(user_id: string, org_id: string): Promise<IBill[]> {
        const orgRepo = new organizationRepositry();

        // Check org belongs to user and org exists.
        const userOrgs: IOrganization[] = await orgRepo.getOrganizationByIdAndUserId(user_id, org_id);
        if (userOrgs.length == 0) {
            throw new NotFoundError('Reqeusted organization not found for user. Please check and try again.');
        }

        // Fetch org bills
        const billsRepo = new billsRepository();
        return (await billsRepo.getOrgBills(user_id, org_id)).rows;
    }

    async createbill(bill: ICreateBill) {
        const billsRepo = new billsRepository();
        // Check of org exits.
        const orgRepo = new organizationRepositry();
        const existingOrg: IOrganization[] = await orgRepo.getOrganizationByIdAndUserId((bill.u_id).toString(),
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

    async deletebill(user_id: string, org_id: string, bill_id: string) {
        const orgRepo = new organizationRepositry();
        // Check org belongs to user and org exists.
        const userOrgs: IOrganization[] = await orgRepo.getOrganizationByIdAndUserId(user_id, org_id);
        if (userOrgs.length == 0) {
            throw new NotFoundError('Reqeusted organization not found for user. Please check and try again.');
        }

        const billsRepo = new billsRepository();
        return await billsRepo.deletebill(org_id, bill_id);
    }
}

export =billsService;