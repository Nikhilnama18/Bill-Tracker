import { ICreateOrganization, IOrganization } from "../../contracts/IOrganization";
import organizationRepositry from "../../repositories/organizations/organizationsRepo";
import { BadRequestError } from "../../core/ApiError";


class organizationService {
  async getOrganizationById(u_id: string, o_id: string) {
    const orgRepo = new organizationRepositry();
    const org: IOrganization[] = await orgRepo.getOrganizationById(u_id, o_id);
    // TODO : Need to shitf this logic.
    if (org.length > 0) {
      return org[0];
    }
    else {
      return { "message": "Resource not found." }
    }
  }

  async getOrganizationByUserId(u_id: string) {
    const orgRepo = new organizationRepositry();
    const org: IOrganization[] = await orgRepo.getOrganizationsByUserId(u_id);
    if (org.length > 0) {
      return org;
    }
    else {
      return [{ "message": "Resource not found." }]
    }
  }

  async createOrganization(org: ICreateOrganization): Promise<IOrganization[]> {
      const orgRepo = new organizationRepositry();
      const existingOrg: IOrganization[] = await orgRepo.getOrganizationByName((org.u_id).toString(),
        (org.o_name));

      if (existingOrg.length != 0)
        throw new BadRequestError("Organization name already exists. Please check and try again.")

      return await orgRepo.createOrganization(org);
  }
}

export =organizationService;