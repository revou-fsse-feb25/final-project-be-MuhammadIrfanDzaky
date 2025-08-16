import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return this.prisma.user.findMany();
	}

	async getById(id: number) {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async update(id: number, data: any) {
		return this.prisma.user.update({ where: { id }, data });
	}

	async delete(id: number) {
		return this.prisma.user.delete({ where: { id } });
	}
}