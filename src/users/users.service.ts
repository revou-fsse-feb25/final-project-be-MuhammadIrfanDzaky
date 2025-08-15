import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	async getAll() {
		return prisma.user.findMany();
	}

	async getById(id: number) {
		return prisma.user.findUnique({ where: { id } });
	}

	async update(id: number, data: any) {
		return prisma.user.update({ where: { id }, data });
	}

	async delete(id: number) {
		return prisma.user.delete({ where: { id } });
	}
}