import 'dotenv/config'
import { envValidationSchema } from './env.validation'

interface EnvVars {
  NODE_ENV: string;
  PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_TYPE: 'postgres' | 'mysql' | 'sqlite';
}

const {error, value} = envValidationSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    db:{
        username: envVars.DB_USERNAME,
        password: envVars.DB_PASSWORD,
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        database: envVars.DB_NAME,
        type: envVars.DB_TYPE,
    }
};
