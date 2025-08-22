import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException, NotFoundException, BadRequestException, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import type { Request } from 'express';
import { CourtsService } from './courts.service';
import { JwtAuthGuard } from 'src/global/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { CreateCourtDto } from './dto/req/create-court.dto';
import { UpdateCourtDto } from './dto/req/update-court.dto';
import { DeleteCourtDto } from './dto/req/delete-court.dto';
import { CreateCourtResDto } from './dto/res/create-court-res.dto';
import { UpdateCourtResDto } from './dto/res/update-court-res.dto';

@ApiTags('Courts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('courts')
export class CourtsController {
    constructor(private readonly courtsService: CourtsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all courts' })
    @ApiResponse({ status: 200, description: 'List of courts.' })
    async getAll(): Promise<CreateCourtResDto[]> {
        try {
            return await this.courtsService.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch courts');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get court by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Court details.' })
    async getById(@Param('id') id: number): Promise<CreateCourtResDto> {
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
    @ApiOperation({ summary: 'Create a new court' })
    @ApiResponse({ status: 201, description: 'Court created.' })
    async create(@Body() body: CreateCourtDto, @Req() req: Request): Promise<CreateCourtResDto> {
        const user = req.user as any;
        if (user.role === UserRole.super_admin) {
            if (!body.ownerId) {
                throw new BadRequestException('ownerId is required for admin');
            }
            return this.courtsService.create({ ...body, ownerId: body.ownerId });
        }
        if (user.role === UserRole.field_owner) {
            return this.courtsService.create({ ...body, ownerId: user.id });
        }
        throw new ForbiddenException('You do not have permission to create a court');
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a court' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Court updated.' })
    async update(@Param('id') id: number, @Body() courtData: UpdateCourtDto): Promise<UpdateCourtResDto> {
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
    @ApiOperation({ summary: 'Delete a court' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Court deleted.' })
    async delete(@Param() params: DeleteCourtDto): Promise<{ success: boolean }> {
        try {
            const deleted = await this.courtsService.delete(params.id);
            if (!deleted) throw new NotFoundException('Court not found');
            return { success: true };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete court');
        }
    }
}