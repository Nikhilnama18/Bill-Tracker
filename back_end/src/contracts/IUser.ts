export interface IUser {
    u_id: number,
    u_name: string,
    u_password: string,
    u_org_name: string,
    u_org_gst: string,
    u_org_address: string,
    isdeleted: boolean
}

export interface ICreateUser {
    u_name: string,
    u_password: string,
    u_org_name: string,
    u_org_gst: string,
    u_org_address: string,
    isdeleted: boolean
}
export interface ILoginResponse {
    u_id: number,
    auth: boolean,
    token: string
}