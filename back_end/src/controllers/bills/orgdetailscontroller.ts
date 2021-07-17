import Router, { Request, Response, NextFunction } from 'express';
import orgbillService from '../../services/bills/billsService';
const router = Router();

// Create Bill
// router.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // const billservice = new orgbillService();
//         // const findbill = await billservice.createbill(req.body.org_id, req.body.bill_id, req.body.bill_amt);
//         // if (findbill.rowCount == 0) {
//         //     res.status(201).json({
//         //         message: 'new bill created'
//         //     })
//         // } else {
//         //     res.status(201).json({
//         //         message: 'Bill id already exists'
//         //     })
//         // }
//     }
//     catch (e) {
//         console.log(`Err : orgbill : Cont : createbill  ${e}`);
//         throw (e);
//     }
// })

// Get All bills
// Update bill
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billsservice = new orgbillService();
        const results = await billsservice.updatebill(req.body.org_id, req.body.bill_id, req.body.bill_amt)
        if (results.rowCount > 0) {
            res.status(201).json({
                message: 'Bills are updated',
                bill: results.rows
            })
        } else {
            res.status(201).json({
                message: 'No bills exits'
            })
        }
    } catch (e) {
        console.log(`Err : orgbill : Cont : update  ${e}`);
        throw (e);
    }
})

// Delete Bill
router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const billsservice = new orgbillService();
        const results = await billsservice.deletebill(req.body.org_id, req.body.bill_id);
        if (results.rowCount > 0) {
            res.status(201).json({
                message: 'Bills is deleted',
            })
        } else {
            res.status(201).json({
                message: 'No bills exits'
            })
        }
    } catch (e) {
        console.log(`Err : orgbill : Cont : del  ${e}`);
        throw (e);
    }
})


export =router;