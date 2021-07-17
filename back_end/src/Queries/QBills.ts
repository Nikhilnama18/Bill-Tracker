export const findorg_Q = `Select 1 from orgbills where org_id =$1`;
export const findbill_Q = `Select 1 from orgbills where bill_id =$1`;
export const getbills_Q = `Select bill_id , org_location ,bill_amt ,bill_status from orgbills where org_id=$1`;
//Write query for creating a bill
export const createbills_Q = `Insert into`;
//Write query for Updating a bill
export const updatebill_Q = `Update`;
// 
export const deletebill_Q= `Update orgbills set isdeleted =true where bill_id =$1`