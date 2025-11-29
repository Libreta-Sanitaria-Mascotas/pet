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
  
  /**
   * Crea una mascota validando existencia del propietario.
   */
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

      const now = new Date();
      if (createPetDto.birthDate && createPetDto.birthDate > now) {
        throw new RpcException({
          statusCode: 400,
          message: 'La fecha de nacimiento no puede ser futura',
        });
      }
      if (createPetDto.weight && createPetDto.weight > 200) {
        throw new RpcException({
          statusCode: 400,
          message: 'El peso informado es inválido',
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

  /** Lista todas las mascotas (uso interno). */
  async findAll() {
    return await this.petRepository.find();
  }

  /** Busca una mascota por ID. */
  async findOne(id: string) {
    return await this.petRepository.findOneBy({ id });
  }

  /** Obtiene mascotas por ID de propietario. */
  async findByOwnerId(ownerId: string) {
    return await this.petRepository.find({
      where: {
        ownerId: ownerId,
      },
    });
  }

  /**
   * Actualiza mascota sin permitir cambio de propietario; preserva mediaId si no se envía.
   */
  async update(updatePetDto: UpdatePetDto) {
    const { id, ...data } = updatePetDto;
    const petFound = await this.findOne(id);
    if (!petFound) {
      throw new RpcException({
        statusCode: 404,
        message: 'Pet not found',
      });
    }
    if (data.ownerId && data.ownerId !== petFound.ownerId) {
      throw new RpcException({
        statusCode: 403,
        message: 'No está permitido cambiar el propietario de la mascota',
      });
    }
    if (data.birthDate && data.birthDate > new Date()) {
      throw new RpcException({
        statusCode: 400,
        message: 'La fecha de nacimiento no puede ser futura',
      });
    }
    if (data.weight && data.weight > 200) {
      throw new RpcException({
        statusCode: 400,
        message: 'El peso informado es inválido',
      });
    }
    if (data.mediaId === undefined) {
      // evitar borrar mediaId si no se envía
      delete (data as any).mediaId;
    }
    return this.petRepository.save({
      ...petFound,
      ...data,
    });
  }

  /** Elimina una mascota por ID (soft delete). */
  async remove(id: string) {
    const petFound = await this.findOne(id);
    if (!petFound) {
      throw new RpcException({
        statusCode: 404,
        message: 'Pet not found',
      });
    }
    return this.petRepository.softRemove(petFound);
  }

  /** Devuelve si la mascota existe (para validaciones cruzadas). */
  async validate(id: string): Promise<{ exists: boolean }> {
    const pet = await this.petRepository.findOneBy({ id });
    return { exists: !!pet };
  }
}
