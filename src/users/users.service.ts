import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) {}

	getUsers() {
		return this.userRepository.find();
	}

	getOneUser(id: number) {
		return this.userRepository.findOne({ where: { id } });
	}

	createUser(user: CreateUserDTO) {
		const newUser = this.userRepository.create(user);

		return this.userRepository.save(newUser);
	}

	updateUser(id: number, userData: UpdateUserDTO) {
		return this.userRepository.update({ id }, userData);
	}

	deleteUser(id: number) {
		return this.userRepository.delete({ id });
	}
}
