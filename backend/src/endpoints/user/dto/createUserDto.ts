import { ApiProperty } from '@nestjs/swagger';
import { LinkDto } from 'src/endpoints/linktree/dto/linkDto';
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

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    isArray: false,
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName!: string;

  @ApiProperty({
    description: 'The last name of the user',
    isArray: false,
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName!: string;

  @ApiProperty({
    description: 'The profile description of the user',
    isArray: false,
    type: String,
  })
  @IsString()
  readonly description?: string;

  @ApiProperty({
    description: 'The URL of the user profile picture',
    isArray: false,
    type: String,
  })
  @IsString()
  readonly imageUrl?: string;

  @ApiProperty({
    description: "The linktree containing the selection of links that will be shown on the user's page",
    isArray: true,
    required: false,
    type: LinkDto,
  })
  @Type(() => LinkDto)
  @ValidateNested({ each: true })
  @IsArray()
  readonly linktree?: LinkDto[];
}
