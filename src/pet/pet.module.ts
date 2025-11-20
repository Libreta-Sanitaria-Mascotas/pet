import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Pet } from './entities/pet.entity';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin123@rabbitmq:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
