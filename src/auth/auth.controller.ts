import { Controller, Post, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() body: { email: string; password: string }) {
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
	async register(@Body() body: any) {
		try {
			return await this.authService.register(body);
		} catch (error) {
			console.error(error);
			throw new InternalServerErrorException('Failed to register');
		}
	}
}