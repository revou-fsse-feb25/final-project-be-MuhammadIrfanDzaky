import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookingDto {
    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsNumber()
    courtId?: number;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsNumber()
    userId?: number;

    @ApiPropertyOptional({ example: '2025-08-20' })
    @IsOptional()
    @IsString()
    date?: string;

    @ApiPropertyOptional({ example: '10:00' })
    @IsOptional()
    @IsString()
    startTime?: string;

    @ApiPropertyOptional({ example: '12:00' })
    @IsOptional()
    @IsString()
    endTime?: string;

    @ApiPropertyOptional({ example: 100000 })
    @IsOptional()
    @IsNumber()
    totalPrice?: number;

    @ApiPropertyOptional({ example: 'Some notes' })
    @IsOptional()
    @IsString()
    notes?: string;

    @ApiPropertyOptional({ example: 'confirmed' })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({ example: 'paid' })
    @IsOptional()
    @IsString()
    paymentStatus?: string;
}