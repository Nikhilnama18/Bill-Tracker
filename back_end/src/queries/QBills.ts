export const findorg_Q = `Select 1 from orgbills where org_id =$1`;
export const findbill_Q = `Select 1 from orgbills where bill_id =$1`;
export const getbills_Q = `Select bill_id , org_location ,bill_amt ,bill_status from orgbills where org_id=$1`;
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