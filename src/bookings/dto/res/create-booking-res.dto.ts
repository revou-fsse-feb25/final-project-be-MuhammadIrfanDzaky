import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateBookingResDto {
    @ApiProperty({ example: 1 })
    id: number;
    @ApiProperty({ example: 1 })
    courtId: number;
    @ApiProperty({ example: 1 })
    userId: number;
    @ApiProperty({ example: '2025-08-20' })
    date: string;
    @ApiProperty({ example: '10:00' })
    startTime: string;
    @ApiProperty({ example: '12:00' })
    endTime: string;
    @ApiProperty({ example: 100000 })
    totalPrice: number;
    @ApiProperty({ example: 'confirmed' })
    status: string;
    @ApiProperty({ example: 'paid' })
    paymentStatus: string;
    @ApiPropertyOptional({ example: 'Some notes' })
    notes: string | null;
    @ApiProperty({ example: '2025-08-19T00:00:00.000Z' })
    createdAt: Date;
    @ApiProperty({ example: '2025-08-19T00:00:00.000Z' })
    updatedAt: Date;
}