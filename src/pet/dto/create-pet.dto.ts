import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxDate,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export const PET_SIZES = ['small', 'medium', 'large'] as const;
export type PetSize = (typeof PET_SIZES)[number];
export const PET_SPECIES = ['dog', 'cat', 'bird', 'rabbit', 'other'] as const;
export type PetSpecies = (typeof PET_SPECIES)[number];

export class CreatePetDto {
  @ApiProperty({
    description: 'The name of the pet',
    example: 'Fluffy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The species of the pet',
    example: 'dog',
    enum: PET_SPECIES,
  })
  @IsEnum(PET_SPECIES)
  species: PetSpecies;

  @ApiProperty({
    description: 'The breed of the pet',
    example: 'Siamese',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({
    description: 'The birth date of the pet',
    example: '2020-01-01',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MaxDate(new Date(), { message: 'La fecha de nacimiento no puede ser futura' })
  birthDate: Date;

  @ApiProperty({
    description: 'The sex of the pet',
    example: 'male',
  })
  @IsString()
  @IsIn(['male', 'female'])
  @IsOptional()
  sex?: 'male' | 'female';

  @ApiProperty({
    description: 'The ID of the owner of the pet',
    example: '12345678-1234-1234-1234-123456789012',
  })
  @IsUUID()
  @IsOptional()
  ownerId?: string;

  @ApiProperty({
    description: 'The media ID of the pet image',
    example: '12345678-1234-1234-1234-123456789012',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  mediaId?: string;

  @ApiProperty({
    description: 'Tamaño de la mascota',
    example: 'medium',
    enum: PET_SIZES,
    required: false,
  })
  @IsIn(PET_SIZES)
  @IsOptional()
  size?: PetSize;

  @ApiProperty({
    description: 'Peso de la mascota en kilogramos',
    example: 12.5,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0.1)
  @Max(200, { message: 'El peso no puede superar los 200kg' })
  @IsOptional()
  @Type(() => Number)
  weight?: number;
}
