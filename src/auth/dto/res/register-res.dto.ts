import { ApiProperty } from '@nestjs/swagger';
export class RegisterResDto {
    @ApiProperty({ example: 'JWT_TOKEN' })
    token: string;
    @ApiProperty({
        example: {
            id: 1,
            email: 'user@example.com',
            name: 'John Doe',
            role: 'regular_user',
            isActive: true,
            createdAt: '2025-08-19T00:00:00.000Z',
            updatedAt: '2025-08-19T00:00:00.000Z'
        }
    })
    user: {
        id: number;
        email: string;
        name: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}