import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '1234567890' })
    @IsString()
    phone: string;

    @ApiProperty({ enum: ['super_admin', 'field_owner', 'regular_user'], example: 'regular_user' })
    @IsString()
    role: string;

    @ApiProperty({ example: 'yourpassword' })
    @IsString()
    password: string;
}