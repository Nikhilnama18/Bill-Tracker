export const findBill_Q =
    `SELECT b_id
FROM public.bills
WHERE o_id = $1 AND b_id = $2 AND isdeleted = false`;

export const getBills_Q =
    `SELECT * 
FROM public.bills
WHERE u_id = $1 AND o_id = $2 AND isdeleted = false
ORDER BY c_date DESC`
//Write query for creating a bill

export const createBill_Q =
    `INSERT INTO public.bills
(o_id, u_id, ammount, due_ammount, issue_timestamp, isdeleted, c_date, u_date)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *
`
//Write query for Updating a bill
export const updateBill_Q = `UPDATE public.bills
SET ammount = $4 , due_ammount = $5 , u_date = now()
WHERE u_id = $1 AND o_id = $2 AND b_id = $3
RETURNING *`;

export const updateBillAmmount_Q = `UPDATE public.bills
SET ammount = $4 , u_date = now()
WHERE u_id = $1 AND o_id = $2 AND b_id = $3
RETURNING *`;


export const updateBillDueAmmount_Q = `UPDATE public.bills
SET due_ammount= $4 , u_date = now()
WHERE u_id = $1 AND o_id = $2 AND b_id = $3
RETURNING *`;


export const deleteBill_Q =
    `UPDATE
	public.bills
SET
	isdeleted = true, u_date = now()
WHERE
	o_id = $1 AND b_id = $2 AND isdeleted = false
RETURNING b_id`;