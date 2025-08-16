import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
	) {}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return null;
		}
		const payload = { sub: user.id, email: user.email, role: user.role };
		const token = this.jwtService.sign(payload);
		return { token, user: { id: user.id, email: user.email, role: user.role } };
	}

	async register(data: any) {
		const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
		if (existing) throw new BadRequestException('Email already registered');
		const hashed = await bcrypt.hash(data.password, 10);
		const user = await this.prisma.user.create({
			data: {
				...data,
				password: hashed,
				role: data.role || UserRole.regular_user,
			},
		});
		return user;
	}
}
