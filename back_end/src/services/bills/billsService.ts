import { isNull, isUndefined } from 'lodash';
import { IBill, ICreateBill, IUpdateBill } from '../../contracts/IBills';
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

    async updatebill(bill: IUpdateBill) {
        const orgRepo = new organizationRepositry();

        // Check org belongs to user and org exists.
        const userOrgs: IOrganization[] = await orgRepo.getOrganizationByIdAndUserId(bill.u_id.toString(), bill.o_id.toString());
        if (userOrgs.length == 0) {
            throw new NotFoundError('Reqeusted organization not found for user. Please check and try again.');
        }

        // Fetch org bills
        const billsRepo = new billsRepository();
        const foundBill: IBill[] = await billsRepo.findBillById(bill.o_id.toString(), bill.b_id.toString());
        if (foundBill.length == 0)
            throw new NotFoundError('Reqeusted bill not found in organization given for user. Please check and try again.');

        // Only update due_ammount of bill
        if (isUndefined(bill.ammount) || isNull(bill.ammount))
            return await billsRepo.updateBillDueAmmount(bill);
        // Only update ammount of bill
        else if (isUndefined(bill.due_ammount) || isNull(bill.due_ammount))
            return await billsRepo.updateBillAmmount(bill);
        // Update ammount and due_ammount of bill
        else
            return await billsRepo.updateBill(bill);
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