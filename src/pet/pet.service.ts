import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}
  async create(createPetDto: CreatePetDto) {
    return await this.petRepository.save(createPetDto);
  }

  async findAll() {
    return await this.petRepository.find();
  }

  async findOne(id: string) {
    return await this.petRepository.findOneBy({id});
  }

  async findByOwnerId(ownerId: string) {
    return await this.petRepository.find({
      where: {
        ownerId,
      },
    });
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const petFound = await this.findOne(id);
    if (!petFound) {
      throw new Error('Pet not found');
    }
    return this.petRepository.save({
      ...petFound,
      ...updatePetDto,
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
