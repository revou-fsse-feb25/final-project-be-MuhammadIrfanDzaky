import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CourtsService {
    async getAll() {
        return prisma.court.findMany({ include: { owner: true, bookings: true } });
    }

    async getById(id: number) {
        return prisma.court.findUnique({ where: { id }, include: { owner: true, bookings: true } });
    }

    async create(data: any) {
        return prisma.court.create({ data });
    }

    async update(id: number, data: any) {
        return prisma.court.update({ where: { id }, data });
    }

    async delete(id: number) {
        return prisma.court.delete({ where: { id } });
    }
}