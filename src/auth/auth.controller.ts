import { Controller, Post, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserRole } from '@prisma/client/wasm';
import { LoginDto } from './dto/req/login.dto';
import { RegisterDto } from './dto/req/register.dto';
import { LoginResDto } from './dto/res/login-res.dto';
import { RegisterResDto } from './dto/res/register-res.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOperation({ summary: 'Login' })
	@ApiResponse({ status: 200, description: 'User logged in.' })
	async login(@Body() body: LoginDto): Promise<LoginResDto> {
		try {
			const result = await this.authService.login(body.email, body.password);
			if (!result) throw new BadRequestException('Invalid credentials');
			return result;
		} catch (error) {
			if (error instanceof BadRequestException) throw error;
			throw new InternalServerErrorException('Failed to login');
		}
	}

	@Post('register')
	@ApiOperation({ summary: 'Register' })
	@ApiResponse({ status: 201, description: 'User registered.' })
	async register(@Body() body: RegisterDto): Promise<RegisterResDto> {
		try {
			const { email, name, phone, role, password  } = body;
			return await this.authService.register({
				email,
				name,
				phone,
				role: role ? (UserRole as any)[role] : undefined,
				password,
			});
		} catch (error) {
			console.error(error);
			throw new InternalServerErrorException('Failed to register');
		}
	}
}