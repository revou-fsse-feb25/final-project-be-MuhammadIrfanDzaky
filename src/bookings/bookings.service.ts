import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class BookingsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.booking.findMany(
            { include: 
                { user: true, court: true }
            }
        );
    }

    async getByUserId(userId: number) {
        return this.prisma.booking.findMany(
            { where: { userId }, include: { user: true, court: true } }
        );
    }

    async getByCourtId(courtId: number) {
        return this.prisma.booking.findMany(
            { where: { courtId }, include: { user: true, court: true } }
        );
    }

    async create(data: any) {
        return this.prisma.booking.create({ data });
    }

    async update(id: number, data: any) {
        return this.prisma.booking.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prisma.booking.delete({ where: { id } });
    }
}