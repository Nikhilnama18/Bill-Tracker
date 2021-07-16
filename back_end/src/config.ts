// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT);

export const db = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
};

export const logDirectory = process.env.LOG_DIR;
