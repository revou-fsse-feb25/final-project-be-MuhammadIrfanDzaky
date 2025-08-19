import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourtDto {
    @ApiProperty({ example: 'Court A' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Indoor futsal court' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'Jl. Sudirman No. 1, Jakarta' })
    @IsString()
    location: string;

    @ApiProperty({ example: 150000 })
    @IsNumber()
    pricePerHour: number;

    @ApiProperty({ example: 'https://example.com/court.jpg' })
    @IsString()
    image: string;

    @ApiProperty({ example: ['Parking', 'Changing Room', 'Cafeteria'] })
    @IsArray()
    @IsString({ each: true })
    facilities: string[];

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsNumber()
    ownerId?: number;
}