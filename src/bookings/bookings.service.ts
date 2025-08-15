import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class BookingsService {
    async getAll() {
        return prisma.booking.findMany(
            { include: 
                { user: true, court: true }
            }
        );
    }

    async getByUserId(userId: number) {
        return prisma.booking.findMany(
            { where: { userId }, include: { user: true, court: true } }
        );
    }

    async getByCourtId(courtId: number) {
        return prisma.booking.findMany(
            { where: { courtId }, include: { user: true, court: true } }
        );
    }

    async create(data: any) {
        return prisma.booking.create({ data });
    }

    async update(id: number, data: any) {
        return prisma.booking.update({ where: { id }, data });
    }

    async delete(id: number) {
        return prisma.booking.delete({ where: { id } });
    }
}