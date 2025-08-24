import { Controller, Get, Post, Put, Delete, Param, Body, InternalServerErrorException, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateBookingDto } from './dto/req/create-booking.dto';
import { UpdateBookingDto } from './dto/req/update-booking.dto';
import { CreateBookingResDto } from './dto/res/create-booking-res.dto';
import { UpdateBookingResDto } from './dto/res/update-booking-res.dto';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/global/jwt-auth.guard';

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all bookings' })
    @ApiResponse({ status: 200, description: 'List of bookings.' })
    async getAll(): Promise<CreateBookingResDto[]> {
        try {
            return await this.bookingsService.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch bookings');
        }
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get bookings by user ID' })
    @ApiParam({ name: 'userId', type: String })
    @ApiResponse({ status: 200, description: 'List of bookings for a user.' })
    async getByUserId(@Param('userId') userId: number): Promise<CreateBookingResDto[]> {
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
    @ApiOperation({ summary: 'Get bookings by court ID' })
    @ApiParam({ name: 'courtId', type: String })
    @ApiResponse({ status: 200, description: 'List of bookings for a court.' })
    async getByCourtId(@Param('courtId') courtId: number): Promise<CreateBookingResDto[]> {
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
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiResponse({ status: 201, description: 'Booking created.' })
    async create(@Body() bookingData: CreateBookingDto): Promise<CreateBookingResDto> {
        try {
            if (!bookingData) throw new BadRequestException('Booking data is required');
            return await this.bookingsService.create(bookingData);
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to create booking');
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a booking' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Booking updated.' })
    async update(@Param('id') id: number, @Body() bookingData: UpdateBookingDto): Promise<UpdateBookingResDto> {
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
    @ApiOperation({ summary: 'Delete a booking' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Booking deleted.' })
    async delete(@Param('id') id: number): Promise<{ success: boolean }> {
        try {
            const deleted = await this.bookingsService.delete(Number(id));
            if (!deleted) throw new NotFoundException('Booking not found');
            return { success: true };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete booking');
        }
    }
}