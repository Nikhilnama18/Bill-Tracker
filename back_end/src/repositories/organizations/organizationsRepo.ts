import { Client } from 'pg';
import { createOrganization_Q, getOrganizationByIdAndUserId_Q,
     getOrganizationByNameAndUserId_Q, getOrganizationsByUserId_Q,
     getOrganizationById_Q } from '../../Queries/QOrganizations';
import { ICreateOrganization, IOrganization } from '../../contracts/IOrganization';
import { db } from '../../config';

const client = new Client({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: parseInt(db.port),
});
client.connect();

class organizationRepositry {

  /**
   * Returns a organization object if exists with given `o_id`
   * @param {string} o_id Organization Id
   * @returns {IOrganization} IOrganization
   */
   async getOrganizationById(o_id: string): Promise<IOrganization[]> {
    return (await client.query(getOrganizationById_Q, [o_id])).rows;
  }

    /**
   * Returns a organization object if exists with given `o_id`
   * @param {string} o_id Organization Id
   * @returns {IOrganization} IOrganization
   */
  async getOrganizationByIdAndUserId(u_id: string, o_id: string): Promise<IOrganization[]> {
    return (await client.query(getOrganizationByIdAndUserId_Q, [u_id, o_id])).rows;
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
  async getOrganizationByNameAndUserId(u_id: string, o_name: string): Promise<IOrganization[]> {
    return (await client.query(getOrganizationByNameAndUserId_Q, [u_id, o_name])).rows;
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


}

export = organizationRepositry;