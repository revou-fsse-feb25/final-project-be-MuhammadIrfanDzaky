import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class CourtsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.court.findMany({ include: { owner: true, bookings: true } });
    }

    async getById(id: number) {
        return this.prisma.court.findUnique({ where: { id }, include: { owner: true, bookings: true } });
    }

    async create(data: any) {
        return this.prisma.court.create({ data });
    }

    async update(id: number, data: any) {
        return this.prisma.court.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prisma.court.delete({ where: { id } });
    }
}