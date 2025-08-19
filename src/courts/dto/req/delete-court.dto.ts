import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCourtDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    id: number;
}