import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({
    summary: 'Create a new pet'
  })
  @ApiBody({
    type: CreatePetDto,
  })
  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @ApiOperation({
    summary: 'Get all pets'
  })
  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @ApiOperation({
    summary: 'Get a pet by id'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get a pet by owner id'
  })
  @Get('owner/:ownerId')
  findByOwnerId(@Param('ownerId') ownerId: string) {
    return this.petService.findByOwnerId(ownerId);
  }

  @ApiOperation({
    summary: 'Update a pet by id'
  })
  @ApiBody({
    type: UpdatePetDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @ApiOperation({
    summary: 'Delete a pet by id'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }
}
