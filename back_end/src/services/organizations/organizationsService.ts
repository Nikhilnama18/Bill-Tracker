import { ICreateOrganization, IOrganization, IUpdateOrganization } from "../../contracts/IOrganization";
import organizationRepositry from "../../repositories/organizations/organizationsRepo";
import { BadRequestError } from "../../core/ApiError";
import userRepositry from "../../repositories/user/usersRepo";
import { IUser } from "../../contracts/IUser";


class organizationService {
  async getOrganizationById(u_id: string, o_id: string) {
    const orgRepo = new organizationRepositry();
    return (await orgRepo.getOrganizationById(u_id, o_id));

  }

  async getOrganizationByUserId(u_id: string) {
    const orgRepo = new organizationRepositry();
    return (await orgRepo.getOrganizationsByUserId(u_id));
  }

  async createOrganization(org: ICreateOrganization): Promise<IOrganization[]> {
    const orgRepo = new organizationRepositry();
    const existingOrg: IOrganization[] = await orgRepo.getOrganizationByName((org.u_id).toString(),
      (org.o_name));

    if (existingOrg.length != 0)
      throw new BadRequestError("Organization name already exists. Please check and try again.")

    return await orgRepo.createOrganization(org);
  }

  async updateOrganisation(org: IUpdateOrganization): Promise<IOrganization[]> {
    const orgRepo = new organizationRepositry();
    const userRepo = new userRepositry();

    // Checking user
    const user: IUser[] = await userRepo.getUserById(org.u_id);

    // No user found.
    if (user.length == 0)
      throw new BadRequestError("User Does not exists. Please check and try again.");

    // Fetch org for user.
    const existingOrg: IOrganization[] = await orgRepo.getOrganizationById(org.u_id, org.o_id);
    if (existingOrg.length == 0)
      throw new BadRequestError("No Organisation found for given user. Please check and try again.");

    if (existingOrg[0].o_name != org.o_name) {
      // User requested to change org name, check if a org alredy exists with same new name.
      const foundOrg: IOrganization[] = await orgRepo.getOrganizationByName(org.u_id, org.o_name);

      if (foundOrg.length != 0)
        throw new BadRequestError("Organisation name already exists. Please check and try again.");
    }

    return await orgRepo.updateOrganization(org);
  }

  async deleteOrganisation(u_id: string, o_id: string) {
    const orgRepo = new organizationRepositry();
    return await orgRepo.deleteOrganization(parseInt(u_id), parseInt(o_id));
  }
}

export = organizationService;