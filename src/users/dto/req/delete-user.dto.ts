import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DeleteUserDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  id: number;
}