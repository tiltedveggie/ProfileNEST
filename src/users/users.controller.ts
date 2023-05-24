import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

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
}
