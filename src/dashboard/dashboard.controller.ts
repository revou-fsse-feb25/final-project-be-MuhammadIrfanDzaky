import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('stats')
    async getStats(@Query('userId') userId?: string, @Query('role') role?: string) {
        try {
            return await this.dashboardService.getStats(userId ? Number(userId) : undefined, role);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch dashboard stats');
        }
    }
}