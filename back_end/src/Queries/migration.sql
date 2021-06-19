-- public.userdetails definition

-- Drop table

-- DROP TABLE public.userdetails;

CREATE TABLE public.userdetails (
	u_id serial NOT NULL,
	u_name varchar NOT NULL,
	u_password varchar NOT NULL,
	isdeleted bool NOT NULL DEFAULT false,
	CONSTRAINT userdetails_u_id_key UNIQUE (u_id),
	CONSTRAINT userdetails_u_name_key UNIQUE (u_name)
);