import { Controller, Get, Param, Put, Delete, Body, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getAll() {
		try {
			return await this.usersService.getAll();
		} catch (error) {
			throw new InternalServerErrorException('Failed to fetch users');
		}
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		try {
			const user = await this.usersService.getById(Number(id));
			if (!user) throw new NotFoundException('User not found');
			return user;
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			throw new InternalServerErrorException('Failed to fetch user');
		}
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() data: any) {
		try {
			if (!data) throw new BadRequestException('User data is required');
			const updated = await this.usersService.update(Number(id), data);
			if (!updated) throw new NotFoundException('User not found');
			return updated;
		} catch (error) {
			if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
			throw new InternalServerErrorException('Failed to update user');
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		try {
			const deleted = await this.usersService.delete(Number(id));
			if (!deleted) throw new NotFoundException('User not found');
			return deleted;
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			throw new InternalServerErrorException('Failed to delete user');
		}
	}
}