export const getOrganizationById_Q =
  `SELECT *
FROM organizations
WHERE u_id = $1 AND o_id = $2`;

export const getOrganizationByName_Q =
  `SELECT *
FROM organizations
WHERE u_id = $1 AND o_name = $2`;

export const getOrganizationByUserId_Q =
  `SELECT *
FROM organizations
WHERE u_id = $1`;

export const createOrganization_Q =
  `INSERT INTO public.organizations
(u_id, o_name, o_gst, o_location, isdeleted, c_date, u_date)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING *
`