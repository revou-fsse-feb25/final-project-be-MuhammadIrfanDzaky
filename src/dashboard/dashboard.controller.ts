import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('stats')
    @ApiOperation({ summary: 'Get dashboard statistics' })
    @ApiQuery({ name: 'userId', required: false, type: String })
    @ApiQuery({ name: 'role', required: false, type: String })
    @ApiResponse({ status: 200, description: 'Dashboard statistics.' })
    async getStats(@Query('userId') userId?: string, @Query('role') role?: string) {
        try {
            return await this.dashboardService.getStats(userId ? Number(userId) : undefined, role);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch dashboard stats');
        }
    }
}