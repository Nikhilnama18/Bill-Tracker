export const getUserById_Q = `
SELECT
	*
FROM
	userdetails
WHERE
	u_id = $1
AND 
    isdeleted = false`;

export const createuser_Q = `
INSERT INTO
    userdetails (u_name, u_password)
VALUES 
    ($1, $2) `;

export const upadatePassword_Q = `
UPDATE
	userdetails
SET
	u_password = $2
WHERE
	u_name = $1
AND
	isdeleted = false 
RETURNING *`;

export const findUser_Q = `
SELECT *
FROM
	userdetails
WHERE
	u_name = $1
AND 
	isdeleted=false`;

export const deleteuser_Q = `
UPDATE
	userdetails
SET
	isdeleted = true
WHERE
	u_name = $1 
RETURNING *`;

export const getuserDeatils_Q = `
SELECT
	*
FROM
	userdetails
WHERE
	u_name = $1
AND
    isdeleted = false`;

export const findperson_Q = `
SELECT
	*
FROM
	userdetails
WHERE
	u_name = $1`;
// export { getuserDeatils_Q, createuser_Q, upadatePassword_Q };