import { Client } from 'pg';
import { createOrganization_Q, getOrganizationById_Q, updateOrganisation_Q, getOrganizationByName_Q, getOrganizationByUserId_Q as getOrganizationsByUserId_Q, deleteOrganization_Q } from '../../queries/QOrganizations';
import { ICreateOrganization, IOrganization, IUpdateOrganization } from '../../contracts/IOrganization';
import { db } from '../../config';
import { cli } from 'winston/lib/winston/config';

const client = new Client({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port,
});
client.connect();

class organizationRepositry {

  /**
   * Returns a organization object if exists with given `o_id`
   * @param {string} o_id Organization Id
   * @returns {IOrganization} IOrganization
   */
  async getOrganizationById(u_id: string, o_id: string): Promise<IOrganization[]> {
    return (await client.query(getOrganizationById_Q, [u_id, o_id])).rows;
  }

  /**
   * Returns all organizations corresponding to given user `u_id`
   * @param {string} u_id User Id
   * @returns {IOrganization} IOrganization
   */
  async getOrganizationsByUserId(u_id: string): Promise<IOrganization[]> {
    return (await client.query(getOrganizationsByUserId_Q, [u_id])).rows;
  }

  /**
   * Returns organization corresponding to given user `u_id` and `o_name`
   * @param {string} u_id User Id
   * @param {string} o_name Organization Name
   * @returns {IOrganization[]} IOrganization
   */
  async getOrganizationByName(u_id: string, o_name: string): Promise<IOrganization[]> {
    return (await client.query(getOrganizationByName_Q, [u_id, o_name])).rows;
  }

  /**
     * Creates a new organization and returns it.
     * @param {ICreateOrganization} org An organization
     * @returns {IOrganization[]} IOrganization
     */
  async createOrganization(org: ICreateOrganization): Promise<IOrganization[]> {
    return (await client.query(createOrganization_Q, [org.u_id, org.o_name,
    org.o_gst, org.o_location, false, new Date(), null])).rows;
  }

  async updateOrganization(org: IUpdateOrganization): Promise<IOrganization[]> {
    return (await client.query(updateOrganisation_Q, [org.u_id, org.o_id,
    org.o_name, org.o_gst, org.o_location])).rows;
  }

  async deleteOrganization(u_id: number, o_id: number): Promise<IOrganization[]> {
    return (await client.query(deleteOrganization_Q, [u_id, o_id])).rows;
  }
}

export = organizationRepositry;