import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserResDto {
    @ApiProperty({ example: 1 })
    id: number;
    @ApiProperty({ example: 'user@example.com' })
    email: string;
    @ApiProperty({ example: 'John Doe' })
    name: string;
    @ApiPropertyOptional({ example: '+6281234567890' })
    phone?: string;
    @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
    avatar?: string;
    @ApiProperty({ enum: ['super_admin', 'field_owner', 'regular_user'], example: 'regular_user' })
    role: string;
    @ApiProperty({ example: true })
    isActive: boolean;
    @ApiProperty({ example: '2025-08-19T00:00:00.000Z' })
    createdAt: Date;
    @ApiProperty({ example: '2025-08-19T00:00:00.000Z' })
    updatedAt: Date;
}