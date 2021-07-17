export interface IOrganization {
  o_id: number;
  u_id: number;
  o_name: string;
  o_gst?: string;
  o_location?: string;
  isdeleted: boolean;
  // Application audit columns
  c_date?: Date;
  u_date?: Date;
}

export interface ICreateOrganization {
  u_id: number;
  o_name: string;
  o_gst: string;
  o_location: string;
}

export function isOrganization(org: IOrganization | any): org is IOrganization {
  return (org as IOrganization).o_name !== undefined;
}
