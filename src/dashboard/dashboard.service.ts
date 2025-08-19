import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) {}

    async getStats(userId?: number, role?: string) {
        if (role === UserRole.super_admin) {
            const [totalUsers, activeCourts, totalBookings, totalRevenue, recentBookings, upcomingBookings] = await Promise.all([
                this.prisma.user.count(),
                this.prisma.court.count({ where: { isActive: true } }),
                this.prisma.booking.count(),
                this.prisma.booking.aggregate({ _sum: { totalPrice: true } }).then(r => r._sum.totalPrice || 0),
                this.prisma.booking.findMany({
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                    include: { court: true, user: true }
                }),
                this.prisma.booking.findMany({
                    where: {
                        date: { gte: new Date().toISOString().slice(0, 10) },
                        status: 'confirmed',
                    },
                    orderBy: { date: 'asc' },
                    take: 5,
                    include: { court: true, user: true }
                })
            ]);
            return {
                totalUsers,
                activeCourts,
                totalBookings,
                totalRevenue,
                recentBookings,
                upcomingBookings
            };
        }
        if (role === UserRole.field_owner && userId) {
            const [activeCourts, totalBookings, totalRevenue, recentBookings, upcomingBookings] = await Promise.all([
                this.prisma.court.count({ where: { ownerId: userId, isActive: true } }),
                this.prisma.booking.count({ where: { court: { ownerId: userId } } }),
                this.prisma.booking.aggregate({
                    where: { court: { ownerId: userId } },
                    _sum: { totalPrice: true }
                }).then(r => r._sum.totalPrice || 0),
                this.prisma.booking.findMany({
                    where: { court: { ownerId: userId } },
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                    include: { court: true, user: true }
                }),
                this.prisma.booking.findMany({
                    where: {
                        court: { ownerId: userId },
                        date: { gte: new Date().toISOString().slice(0, 10) },
                        status: 'confirmed',
                    },
                    orderBy: { date: 'asc' },
                    take: 5,
                    include: { court: true, user: true }
                })
            ]);
            return {
                activeCourts,
                totalBookings,
                totalRevenue,
                recentBookings,
                upcomingBookings
            };
        }
        // Regular users are redirected and do not see dashboard
        return {};
    }
}