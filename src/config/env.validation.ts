import * as Joi from 'joi'

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  
  PORT: Joi.number().default(3003),
  
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_TYPE: Joi.string().valid('postgres', 'mysql', 'sqlite').default('postgres'),
  RABBITMQ_URL: Joi.string().default('amqp://admin:admin123@rabbitmq:5672'),
  RABBITMQ_QUEUE: Joi.string().default('pet_queue'),
}).unknown(true);
