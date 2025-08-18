import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
	) {}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) throw new BadRequestException('Invalid credentials');
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) throw new BadRequestException('Invalid credentials');
		const token = this.jwtService.sign({ sub: user.id, role: user.role });
		return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
	}

	async register(data: { email: string; name: string; password: string; role?: UserRole }) {
		const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
		if (existing) throw new BadRequestException('Email already registered');
		const hashed = await bcrypt.hash(data.password, 10);
		const user = await this.prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				password: hashed,
				role: data.role || UserRole.regular_user,
				isActive: true,
			},
		});
		const token = this.jwtService.sign({ sub: user.id, role: user.role });
		return { token, user };
	}
}
