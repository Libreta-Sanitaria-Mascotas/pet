import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
    @IsString()
    @IsNotEmpty()
    id: string;
}
