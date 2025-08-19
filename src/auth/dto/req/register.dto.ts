import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'yourpassword' })
    @IsString()
    password: string;

    @ApiPropertyOptional({ enum: ['super_admin', 'field_owner', 'regular_user'], example: 'regular_user' })
    @IsOptional()
    @IsString()
    role?: string;
}