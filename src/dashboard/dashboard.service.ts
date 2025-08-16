import { Injectable } from '@nestjs/common';
import { PrismaClient, UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) {}

    async getStats(userId?: number, role?: string) {
        if (role === UserRole.super_admin) {
        const users = await this.prisma.user.count();
        const courts = await this.prisma.court.count();
        const bookings = await this.prisma.booking.count();
        return { users, courts, bookings };
        }
        if (role === UserRole.field_owner && userId) {
        const courts = await this.prisma.court.count({ where: { ownerId: userId } });
        const bookings = await this.prisma.booking.count({ where: { court: { ownerId: userId } } });
        return { courts, bookings };
        }
        if (role === UserRole.regular_user && userId) {
        const bookings = await this.prisma.booking.count({ where: { userId } });
        return { bookings };
        }
        return {};
    }
}