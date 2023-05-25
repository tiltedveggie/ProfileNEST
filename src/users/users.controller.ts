import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
	constructor(private usersServices: UsersService) {}

	@Get()
	getUsers(): Promise<User[]> {
		return this.usersServices.getUsers();
	}

	@Post()
	createUser(@Body() newUser: CreateUserDTO): Promise<User> {
		return this.usersServices.createUser(newUser);
	}

	@Get(':id')
	getOneUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
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
}
