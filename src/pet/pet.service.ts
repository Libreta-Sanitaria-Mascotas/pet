import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { RpcException, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}
  
  async create(createPetDto: CreatePetDto) {
    try {
      if (!createPetDto.ownerId)
        throw new RpcException({
          statusCode: 400,
          message: 'El ID del propietario es obligatorio',
        });

      // Validar que el propietario (User) existe
      const ownerValidation = await firstValueFrom(
        this.userClient.send({ cmd: 'validate_user' }, { id: createPetDto.ownerId })
      );

      if (!ownerValidation || !ownerValidation.exists) {
        throw new RpcException({
          statusCode: 404,
          message: `El propietario con ID ${createPetDto.ownerId} no existe`,
        });
      }

      return await this.petRepository.save(createPetDto);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        statusCode: 500,
        message: 'No se pudo crear la mascota',
      });
    }
  }

  async findAll() {
    return await this.petRepository.find();
  }

  async findOne(id: string) {
    return await this.petRepository.findOneBy({ id });
  }

  async findByOwnerId(ownerId: string) {
    return await this.petRepository.find({
      where: {
        ownerId: ownerId,
      },
    });
  }

  async update(updatePetDto: UpdatePetDto) {
    const { id, ...data } = updatePetDto;
    const petFound = await this.findOne(id);
    if (!petFound) {
      throw new RpcException({
        statusCode: 404,
        message: 'Pet not found',
      });
    }
    return this.petRepository.save({
      ...petFound,
      ...data,
    });
  }

  async remove(id: string) {
    const petFound = await this.findOne(id);
    if (!petFound) {
      throw new RpcException({
        statusCode: 404,
        message: 'Pet not found',
      });
    }
    return this.petRepository.remove(petFound);
  }

  async validate(id: string): Promise<{ exists: boolean }> {
    const pet = await this.petRepository.findOneBy({ id });
    return { exists: !!pet };
  }
}
