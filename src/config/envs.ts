import { envValidationSchema } from './env.validation'
import { loadEnv } from './env.loader'

interface EnvVars {
  NODE_ENV: string;
  PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_TYPE: 'postgres' | 'mysql' | 'sqlite';
  LOG_LEVEL: string;
  RABBITMQ_URL: string;
  RABBITMQ_QUEUE: string;
}

const envVars = loadEnv<EnvVars>(envValidationSchema);

export const envs = {
    nodeEnv: envVars.NODE_ENV,
    logLevel: envVars.LOG_LEVEL,
    port: envVars.PORT,
    db:{
        username: envVars.DB_USERNAME,
        password: envVars.DB_PASSWORD,
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        database: envVars.DB_NAME,
        type: envVars.DB_TYPE,
    },
    rabbitmq: {
      url: envVars.RABBITMQ_URL,
      queue: envVars.RABBITMQ_QUEUE,
    }
};
