import { BadRequestException, Injectable } from '@nestjs/common';
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
        const owner = await this.prisma.user.findUnique({ where: { id: data.ownerId } });
        if (!owner || owner.role !== 'field_owner') {
        throw new BadRequestException('ownerId must belong to a valid field_owner');
        }
        return this.prisma.court.create({
        data: {
            name: data.name,
            description: data.description,
            location: data.location,
            pricePerHour: data.pricePerHour,
            image: data.image,
            facilities: data.facilities,
            ownerId: data.ownerId,
        },
        });
    }

    async update(id: number, data: any) {
        return this.prisma.court.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prisma.court.delete({ where: { id } });
    }
}