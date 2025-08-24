import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}
  async create(createPetDto: CreatePetDto) {
    try {
      if (!createPetDto.ownerId)
        throw new RpcException({
          statusCode: 400,
          message: 'El ID del propietario es obligatorio',
        });
      return await this.petRepository.save(createPetDto);
    } catch (error) {
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
      throw new Error('Pet not found');
    }
    return this.petRepository.save({
      ...petFound,
      ...data,
    });
  }

  async remove(id: string) {
    const petFound = await this.findOne(id);
    if (!petFound) {
      throw new Error('Pet not found');
    }
    return this.petRepository.remove(petFound);
  }
}
