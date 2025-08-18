import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException, NotFoundException, BadRequestException, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import type { Request } from 'express';
import { CourtsService } from './courts.service';
import { JwtAuthGuard } from 'src/global/jwt-auth.guard';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('courts')
export class CourtsController {
    constructor(private readonly courtsService: CourtsService) {}

    @Get()
    async getAll() {
        try {
            return await this.courtsService.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch courts');
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            const court = await this.courtsService.getById(Number(id));
            if (!court) throw new NotFoundException('Court not found');
            return court;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch court');
        }
    }

    @Post()
    async create(@Body() body: any, @Req() req: Request) {
        const user = req.user as any; // Should contain id and role from JWT

        if (user.role === UserRole.super_admin) {
        if (!body.ownerId) {
            throw new BadRequestException('ownerId is required for admin');
        }
        // Optionally, you can check if the ownerId exists and is a field_owner
        return this.courtsService.create({ ...body, ownerId: body.ownerId });
        }

        if (user.role === UserRole.field_owner) {
        // Ignore any ownerId in body, always use the authenticated user's ID
        return this.courtsService.create({ ...body, ownerId: user.id });
        }

        throw new ForbiddenException('You do not have permission to create a court');
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() courtData: any) {
        try {
            if (!courtData) throw new BadRequestException('Court data is required');
            const updated = await this.courtsService.update(Number(id), courtData);
            if (!updated) throw new NotFoundException('Court not found');
            return updated;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update court');
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const deleted = await this.courtsService.delete(Number(id));
            if (!deleted) throw new NotFoundException('Court not found');
            return deleted;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete court');
        }
    }
}