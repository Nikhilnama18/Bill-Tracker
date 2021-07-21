export interface IUser {
    u_id: number,
    u_name: string,
    u_password: string,
    isdeleted: boolean
}
export interface ILoginResponse {
    u_id: number,
    auth: boolean,
    token: string
}