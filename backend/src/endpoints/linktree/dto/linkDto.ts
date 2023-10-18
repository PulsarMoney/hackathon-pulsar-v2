import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  ValidateNested,
  Min,
  IsObject,
  IsArray,
  ArrayMinSize,
  IsEmail,
  IsDateString,
} from 'class-validator';

export class LinkDto {
  @ApiProperty({
    description: 'The url of the link',
    isArray: false,
    required: true,
    name: 'url',
    type: String,
  })
  @IsString()
  url!: string;

  @ApiProperty({
    description: 'The description of the link',
    isArray: false,
    required: true,
    name: 'description',
    type: String,
  })
  @IsString()
  description: string | undefined;

  @ApiProperty({
    description: 'The logo of the link',
    isArray: false,
    required: true,
    name: 'logo',
    type: String,
  })
  @IsString()
  logo: string | undefined;
}
