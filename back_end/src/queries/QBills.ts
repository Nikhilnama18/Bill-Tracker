export const findbill_Q = `Select 1 from orgbills where bill_id =$1`;
export const getBills_Q =
    `SELECT * 
FROM public.bills
WHERE u_id = $1 AND o_id = $2`
//Write query for creating a bill

export const createBill_Q =
    `INSERT INTO public.bills
(o_id, u_id, ammount, due_ammount, issue_timestamp, isdeleted, c_date, u_date)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *
`
//Write query for Updating a bill
export const updatebill_Q = `Update`;
// 
export const deletebill_Q = `Update orgbills set isdeleted =true where bill_id =$1`