-- ALTER USER postgres WITH PASSWORD 'postgres';

-- CREATE USER nick WITH PASSWORD 'nick_18';

-- ALTER USER nick WITH SUPERUSER;

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

DROP TABLE public.organizations;

CREATE TABLE public.organizations (
	o_id serial NOT NULL,
  u_id integer NOT NULL, 
	o_name varchar NOT NULL,
  o_gst varchar NOT NULL,
  o_location varchar DEFAULT NULL,
  isdeleted bool NOT NULL DEFAULT false,
  c_date timestamp DEFAULT NULL,
  u_date timestamp DEFAULT NULL,
	CONSTRAINT organizations_o_id_key UNIQUE (o_id),
  CONSTRAINT organizations_fk FOREIGN KEY (u_id) REFERENCES public.userdetails(u_id)
);
	