import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CourtsService } from './courts.service';

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
    async create(@Body() courtData: any) {
        try {
            if (!courtData) throw new BadRequestException('Court data is required');
            return await this.courtsService.create(courtData);
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to create court');
        }
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