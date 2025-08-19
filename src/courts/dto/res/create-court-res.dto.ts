import { ApiProperty } from '@nestjs/swagger';
export class CreateCourtResDto {
    @ApiProperty({ example: 1 })
    id: number;
    @ApiProperty({ example: 'Court A' })
    name: string;
    @ApiProperty({ example: 'Indoor futsal court' })
    description: string;
    @ApiProperty({ example: 'Jl. Sudirman No. 1, Jakarta' })
    location: string;
    @ApiProperty({ example: 150000 })
    pricePerHour: number;
    @ApiProperty({ example: 'https://example.com/court.jpg' })
    image: string;
    @ApiProperty({ example: ['Parking', 'Changing Room', 'Cafeteria'] })
    facilities: string[];
    @ApiProperty({ example: 1 })
    ownerId: number;
    @ApiProperty({ example: '2025-08-19T00:00:00.000Z' })
    createdAt: Date;
    @ApiProperty({ example: '2025-08-19T00:00:00.000Z' })
    updatedAt: Date;
}