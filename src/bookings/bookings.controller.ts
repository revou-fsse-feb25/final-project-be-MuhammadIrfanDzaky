import { Controller, Get, Post, Put, Delete, Param, Body, Query, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Get()
    async getAll() {
        try {
            return await this.bookingsService.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch bookings');
        }
    }

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        try {
            const bookings = await this.bookingsService.getByUserId(Number(userId));
            if (!bookings) throw new NotFoundException('Bookings not found for user');
            return bookings;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch bookings by user');
        }
    }

    @Get('court/:courtId')
    async getByCourtId(@Param('courtId') courtId: string) {
        try {
            const bookings = await this.bookingsService.getByCourtId(Number(courtId));
            if (!bookings) throw new NotFoundException('Bookings not found for court');
            return bookings;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch bookings by court');
        }
    }

    @Post()
    async create(@Body() bookingData: any) {
        try {
            if (!bookingData) throw new BadRequestException('Booking data is required');
            return await this.bookingsService.create(bookingData);
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to create booking');
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() bookingData: any) {
        try {
            if (!bookingData) throw new BadRequestException('Booking data is required');
            const updated = await this.bookingsService.update(Number(id), bookingData);
            if (!updated) throw new NotFoundException('Booking not found');
            return updated;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update booking');
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const deleted = await this.bookingsService.delete(Number(id));
            if (!deleted) throw new NotFoundException('Booking not found');
            return deleted;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete booking');
        }
    }
}