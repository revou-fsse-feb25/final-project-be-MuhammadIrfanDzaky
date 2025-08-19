import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourtDto {
    @ApiPropertyOptional({ example: 'Court A' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'Indoor futsal court' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 'Jl. Sudirman No. 1, Jakarta' })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional({ example: 150000 })
    @IsOptional()
    @IsNumber()
    pricePerHour?: number;

    @ApiPropertyOptional({ example: 'https://example.com/court.jpg' })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({ example: ['Parking', 'Changing Room', 'Cafeteria'] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    facilities?: string[];

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsNumber()
    ownerId?: number;
}