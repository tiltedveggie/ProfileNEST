import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	ParseIntPipe,
	Patch,
	Post
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateProfileDTO } from './dto/createProfile.dto';

@Controller('users')
export class UsersController {
	constructor(private usersServices: UsersService) {}

	@Get()
	getUsers(): Promise<User[]> {
		return this.usersServices.getUsers();
	}

	@Post()
	createUser(@Body() newUser: CreateUserDTO): Promise<User | HttpException> {
		return this.usersServices.createUser(newUser);
	}

	@Get(':id')
	getOneUser(
		@Param('id', ParseIntPipe) id: number
	): Promise<User | HttpException> {
		return this.usersServices.getOneUser(id);
	}

	@Patch(':id')
	updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() userData: UpdateUserDTO
	) {
		return this.usersServices.updateUser(id, userData);
	}

	@Delete(':id')
	deleteUser(@Param('id', ParseIntPipe) id: number) {
		return this.usersServices.deleteUser(id);
	}

	@Post(':id/profile')
	createProfile(
		@Param('id', ParseIntPipe) id: number,
		@Body() profile: CreateProfileDTO
	) {
		return this.usersServices.createProfile(id, profile);
	}
}
