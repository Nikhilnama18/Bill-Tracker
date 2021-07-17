export const getOrganizationByIdAndUserId_Q =
    `SELECT *
FROM organizations
WHERE u_id = $1 AND o_id = $2 AND isdeleted = false`;

export const getOrganizationByNameAndUserId_Q =
    `SELECT *
FROM organizations
WHERE u_id = $1 AND o_name = $2 AND isdeleted = false`;

export const getOrganizationsByUserId_Q =
    `SELECT *
FROM organizations
WHERE u_id = $1 AND isdeleted = false`;

export const getOrganizationById_Q =
    `SELECT * 
    FROM organizations
    WHERE o_id = $1 AND isdeleted = false`;

export const createOrganization_Q =
    `INSERT INTO public.organizations
(u_id, o_name, o_gst, o_location, isdeleted, c_date, u_date)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING *
`
