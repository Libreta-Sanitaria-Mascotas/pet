import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

//@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) { }

  // @ApiOperation({
  //   summary: 'Create a new pet'
  // })
  // @ApiBody({
  //   type: CreatePetDto,
  // })
  // @Post()
  @MessagePattern({ cmd: 'create_pet' })
  create(@Payload() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  // @ApiOperation({
  //   summary: 'Get all pets'
  // })
  // @Get()
  @MessagePattern({ cmd: 'find_all_pets' })
  findAll() {
    return this.petService.findAll();
  }

  
  // @ApiOperation({
  //   summary: 'Get a pet by id'
  // })
  // @Get(':id')
  @MessagePattern({ cmd: 'find_pet' })
  findOne(@Payload() id: string) {
    return this.petService.findOne(id);
  }
    
  @MessagePattern({ cmd: 'find_all_pets_by_owner_id' })
  findByOwnerId(@Payload('ownerId') ownerId: string) {
    return this.petService.findByOwnerId(ownerId);
  }

  // @ApiOperation({
  //   summary: 'Update a pet by id'
  // })
  // @ApiBody({
  //   type: UpdatePetDto,
  // })
  // @Patch(':id')
  @MessagePattern({ cmd: 'update_pet' })
  update(@Payload() updatePetDto: UpdatePetDto) {
    return this.petService.update(updatePetDto);
  }

  // @ApiOperation({
  //   summary: 'Delete a pet by id'
  // })
  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_pet' })
  remove(@Payload('id') id: string) {
    return this.petService.remove(id);
  }
}
