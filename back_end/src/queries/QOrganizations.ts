import { exitOnError } from "winston";

export const getOrganizationById_Q =
  `SELECT *
FROM
  organizations
WHERE
  u_id = $1 
AND 
  o_id = $2 
AND 
  isdeleted=false`;

export const getOrganizationByName_Q =
  `SELECT *
FROM organizations
WHERE 
  u_id = $1 
AND 
  o_name = $2
AND 
  isdeleted=false`;

export const getOrganizationByUserId_Q =
  `SELECT *
FROM 
  organizations
WHERE 
  u_id = $1
AND 
  isdeleted=false`;

export const createOrganization_Q =
  `INSERT 
INTO
  public.organizations 
  (u_id, o_name, o_gst, o_location, isdeleted, c_date, u_date)
VALUES
  ($1, $2, $3, $4, $5, $6, $7)
RETURNING *
`

export const updateOrganisation_Q =
  `UPDATE
	organizations
SET
	o_name = $3, o_gst=$4,o_location=$5
WHERE
	u_id = $1 AND o_id=$2
AND
	isdeleted = false 
RETURNING *`

export const deleteOrganization_Q = `
UPDATE
	organizations
SET
	isdeleted =true
WHERE
	u_id = $1 AND o_id=$2 AND isdeleted=false
RETURNING o_name`;