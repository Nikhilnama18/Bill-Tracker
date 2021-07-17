import { Router, Request, Response, NextFunction } from 'express';
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../core/asyncHandler';
import { ICreateOrganization, IOrganization, isOrganization } from '../../contracts/IOrganization';
import organizationService from '../../services/organizations/organizationsService';
import { IUser } from '../../contracts/IUser';
import userService from '../../services/users/usersService';
import { IBill, ICreateBill, isBill } from '../../contracts/IBills';
import billsService from '../../services/bills/billsService';
import { NotFoundError } from '../../core/ApiError';

const router = Router();

// users 

// Validates  user credentials with database login values 
router.post('/login', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user_service = new userService();
        let result = await user_service.login(req.body.u_name, req.body.u_password);
        if (result == true) {
            new SuccessResponse('Login success', result).send(res);
        }
        else {
            new NotFoundResponse('Auth Failed').send(res);
        }
    }
    catch (error) {
        throw (error);
    }
}));

//Gets u_id , u_name from database 
router.get('/:u_name', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user_service = new userService();
        let u_name = req.params.u_name;
        const u_deatils: IUser[] = await user_service.userdetails(u_name);
        if (u_deatils.length == 1) {
            new SuccessResponse('success', u_deatils).send(res);
            // res.status(200).json({
            // message: "User details are",
            // U_id: result[0].u_id,
            // User_Name: result[0].u_name,
            // })
        }
        else {
            new NotFoundResponse('Auth Failed').send(res);
        }
    }
    catch (error) {
        // console.log(`Err : Contro : userdetails ${error}`);
        throw error;
        // res.status(404).json({ message: error.message })
    }
}));

//Creates a new record in DB 
router.post('/signup', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user_service = new userService();
        const newUser: IUser[] = await user_service.createuser(req.body.u_name, req.body.u_password);
        new SuccessResponse('User Created', newUser).send(res);
    }
    catch (error) {
        throw error
    }
}))

// updates user password in DB
router.put('/updatepassword', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user_service = new userService();
        const result: IUser[] = await user_service.updatepassword(req.body.u_name, req.body.u_password);
        if (result.length == 1) {
            new SuccessResponse('Password update', result[0].u_name).send(res);
        }
        else {
            new NotFoundResponse('Auth Failed').send(res);
        }
    }
    catch (e) {
        console.log(`Error : Controller : UpadatePass  ${e}`);
        throw (e);
    }
}));

//Deletes a user in DB 
router.delete('/deleteuser', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user_service = new userService();
        const result: IUser[] = await user_service.deletuser(req.body.u_name);
        if (result.length == 1) {
            new SuccessResponse('User Deleted', result[0].u_name).send(res);
        }
        else {
            new BadRequestResponse('Auth Failed').send(res);
        }
    }
    catch (e) {
        throw (e);
    }
}))

// Org

// Fetch org info of a user.
router.get('/:u_id/orgs/:o_id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orgSer = new organizationService();
        // TODO : Define new interface for non success states.
        const org: IOrganization[] = await orgSer.getOrganizationById(req.params.u_id, req.params.o_id);
        if (org.length > 0 && isOrganization(org[0])) {
            new SuccessResponse('success', org).send(res);
        }
        else {
            new NotFoundResponse('Requested organization not found. Please check and try again.').send(res);
        }
    } catch (error) {
        // console.log(`Error for ${req.url} @ ${req.method} :${error}`)
        throw error
    }
}))

// Fetch all orgs of a user
router.get('/:u_id/orgs', asyncHandler(async (req: Request, res: Response) => {
    try {
        const orgSer = new organizationService();
        const org: IOrganization[] = await orgSer.getOrganizationByUserId(req.params.u_id);
        if (org.length > 0 && isOrganization(org[0])) {
            new SuccessResponse('success', org).send(res);
        }
        else {
            new NotFoundResponse('No organizations found. Please check and try again.').send(res);
        }
    } catch (error) {
        console.log(`Error for ${req.url} @ ${req.method} :${error}`)
        throw error
    }
}))

// Add a new org for user.
router.post('/:u_id/orgs', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orgSer = new organizationService();
        // TODO : Need to add validators.
        let newOrg: ICreateOrganization = {
            u_id: req.body.u_id,
            o_name: req.body.o_name,
            o_gst: req.body.o_gst,
            o_location: req.body.o_location
        }

        let createdOrg: IOrganization[] = await orgSer.createOrganization(newOrg);
        new SuccessResponse('success', createdOrg).send(res);

    } catch (error) {
        console.log(`Error for ${req.url} @ ${req.method} :${error}`);
        throw error;
    }

}))

// Bills

// Add a new org for user.
router.post('/:u_id/orgs/:o_id/bills', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billService = new billsService();
        // TODO : Need to add validators.
        let newBill: ICreateBill = {
            u_id: req.body.u_id,
            o_id: req.body.o_id,
            ammount: req.body.ammount,
            due_ammount: req.body.due_ammount,
            issue_timestamp: req.body.issue_timestamp
        }
        let createdBill: IBill[] = await billService.createbill(newBill);
        new SuccessResponse('success', createdBill).send(res);

    } catch (error) {
        console.log(`Error for ${req.url} @ ${req.method} :${error}`);
        throw error;
    }

}))

// Fetch all bill of a org
router.get('/:u_id/orgs/:o_id/bills', asyncHandler(async (req: Request, res: Response) => {
    try {
        const billService = new billsService();
        const bills: IBill[] = await billService.getBills(req.params.u_id, req.params.o_id)
        if (bills.length > 0 && isBill(bills[0])) {
            new SuccessResponse('success', bills).send(res);
        }
        else {
            new NotFoundResponse('No bills found. Please check and try again.').send(res);
        }
    } catch (error) {
        console.log(`Error for ${req.url} @ ${req.method} :${error}`)
        throw error
    }
}))


router.delete('/:u_id/orgs/:o_id/bills/:b_id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billService = new billsService();
        const bill: IBill[] = await billService.deletebill(req.params.u_id, req.params.o_id, req.params.b_id)
        if (bill.length > 0)
            new SuccessResponse('success', bill).send(res);
        else
            throw new NotFoundError('Unable to delete reqeusted bill. Please check and try again.');
    } catch (error) {
        console.log(`Error for ${req.url} @ ${req.method} :${error}`)
        throw error
    }
}))
export = router;
