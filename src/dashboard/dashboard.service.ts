import { Injectable } from '@nestjs/common';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DashboardService {
    async getStats(userId?: number, role?: string) {
        if (role === UserRole.super_admin) {
        const users = await prisma.user.count();
        const courts = await prisma.court.count();
        const bookings = await prisma.booking.count();
        return { users, courts, bookings };
        }
        if (role === UserRole.field_owner && userId) {
        const courts = await prisma.court.count({ where: { ownerId: userId } });
        const bookings = await prisma.booking.count({ where: { court: { ownerId: userId } } });
        return { courts, bookings };
        }
        if (role === UserRole.regular_user && userId) {
        const bookings = await prisma.booking.count({ where: { userId } });
        return { bookings };
        }
        return {};
    }
}