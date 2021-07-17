import { ICreateOrganization, IOrganization } from "../../contracts/IOrganization";
import organizationRepositry from "../../repositories/organizations/organizationsRepo";
import { BadRequestError } from "../../core/ApiError";


class organizationService {
  async getOrganizationById(u_id: string, o_id: string) {
    const orgRepo = new organizationRepositry();
    return (await orgRepo.getOrganizationByIdAndUserId(u_id, o_id));

  }

  async getOrganizationByUserId(u_id: string) {
    const orgRepo = new organizationRepositry();
    return (await orgRepo.getOrganizationsByUserId(u_id));
  }

  async createOrganization(org: ICreateOrganization): Promise<IOrganization[]> {
    const orgRepo = new organizationRepositry();
    const existingOrg: IOrganization[] = await orgRepo.getOrganizationByNameAndUserId((org.u_id).toString(),
      (org.o_name));

    if (existingOrg.length != 0)
      throw new BadRequestError("Organization name already exists. Please check and try again.")

    return await orgRepo.createOrganization(org);
  }
}

export =organizationService;