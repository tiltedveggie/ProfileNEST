import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

	async getUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	async getOneUser(id: number) {
		const userFound = await this.userRepository.findOne({
			where: { id }
		});

		if (!userFound) {
			return new HttpException('User not found!', HttpStatus.NOT_FOUND);
		}

		return userFound;
	}

	async createUser(user: CreateUserDTO) {
		const userFound = await this.userRepository.findOne({
			where: { username: user.username }
		});

		if (userFound) {
			return new HttpException('User already exists!', HttpStatus.CONFLICT);
		}

		const newUser = this.userRepository.create(user);

		return this.userRepository.save(newUser);
	}

	async updateUser(id: number, userData: UpdateUserDTO) {
		const userFound = await this.userRepository.findOne({
			where: { id }
		});

		if (!userFound) {
			return new HttpException('User not found!', HttpStatus.NOT_FOUND);
		}

		return this.userRepository.update(id, userData);
	}

	async deleteUser(id: number) {
		const result = await this.userRepository.delete({ id });

		if (result.affected === 0) {
			return new HttpException('User not found!', HttpStatus.NOT_FOUND);
		}

		return result;
	}
}
