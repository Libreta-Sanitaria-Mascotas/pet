import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin123@rabbitmq:5672'],
        queue: 'pet_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
  console.log('Pet microservice is listening on RabbitMQ (pet_queue)');
}
bootstrap();
