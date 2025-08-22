import { Controller, Get, Param, Put, Delete, Body, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateUserResDto } from './dto/res/update-user-res.dto';
import { DeleteUserDto } from './dto/req/delete-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { CreateUserResDto } from './dto/res/create-user-res.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, description: 'List of users.' })
	async getAll(): Promise<CreateUserResDto[]> {
		try {
			const users = await this.usersService.getAll();
			return users.map(user => ({
				...user,
				phone: user.phone === null ? undefined : user.phone,
				avatar: user.avatar === null ? undefined : user.avatar
			}));
		} catch (error) {
			throw new InternalServerErrorException('Failed to fetch users');
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user by ID' })
	@ApiParam({ name: 'id', type: String })
	@ApiResponse({ status: 200, description: 'User details.' })
	async getById(@Param('id') id: number): Promise<CreateUserResDto> {
		try {
			const user = await this.usersService.getById(Number(id));
			if (!user) throw new NotFoundException('User not found');
			return {
				...user,
				phone: user.phone === null ? undefined : user.phone,
				avatar: user.avatar === null ? undefined : user.avatar
			};
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			throw new InternalServerErrorException('Failed to fetch user');
		}
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a user' })
	@ApiParam({ name: 'id', type: String })
	@ApiResponse({ status: 200, description: 'User updated.' })
	async update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UpdateUserResDto> {
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
	@ApiOperation({ summary: 'Delete a user' })
	@ApiParam({ name: 'id', type: String })
	@ApiResponse({ status: 200, description: 'User deleted.' })
	async delete(@Param() params: DeleteUserDto): Promise<{ success: boolean }> {
		try {
			const deleted = await this.usersService.delete(params.id);
			if (!deleted) throw new NotFoundException('User not found');
			return { success: true };
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			throw new InternalServerErrorException('Failed to delete user');
		}
	}
}