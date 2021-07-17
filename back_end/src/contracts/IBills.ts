export interface IBill {
    b_id: number;
    o_id: number;
    u_id: number;
    ammount: number;
    due_ammount: number;
    // TODO : Find the correct type.
    issue_timestamp: Date
    isdeleted: boolean;
    // Application audit columns
    c_date?: Date;
    u_date?: Date;
}

export interface ICreateBill {
    o_id: number;
    u_id: number;
    ammount: number;
    due_ammount: number;
    issue_timestamp: Date
}

export interface IUpdateBill {
    b_id: number;
    u_id: number;
    o_id: number;
    ammount?: number;
    due_ammount?: number;
}

export function isBill(bill: IBill | any): bill is IBill {
    return (bill as IBill).ammount !== undefined;
}
