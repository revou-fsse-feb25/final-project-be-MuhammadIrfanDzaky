import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  courtId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '2025-08-20' })
  @IsString()
  date: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '12:00' })
  @IsString()
  endTime: string;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  totalPrice: number;

  @ApiPropertyOptional({ example: 'Some notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}