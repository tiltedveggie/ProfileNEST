import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User as UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/createUser.dto';
import { usersMock } from './mocks/users.mock';
import { UpdateUserDTO } from '../dto/updateUser.dto';

describe('UsersService', () => {
	let service: UsersService;
	let repository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(UserEntity),
					useValue: {
						find: jest.fn(),
						findOne: jest.fn(),
						create: jest.fn(),
						save: jest.fn(),
						update: jest.fn(),
						delete: jest.fn()
					}
				}
			]
		}).compile();

		service = module.get<UsersService>(UsersService);
		repository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity)
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});

	describe('database methods', () => {
		it('should return an array of users', async () => {
			const users = usersMock;

			jest.spyOn(repository, 'find').mockResolvedValueOnce(users);

			const result = await service.getUsers();

			expect(result).toBeDefined();
			expect(repository.find).toHaveBeenCalledTimes(1);
		});

		it('should create an user', async () => {
			const userData: CreateUserDTO = {
				username: 'Raul',
				password: 'raulpassword19'
			};

			const userMockData = { ...userData } as UserEntity;

			jest.spyOn(repository, 'create').mockReturnValueOnce(userMockData);
			jest.spyOn(repository, 'save').mockResolvedValueOnce(userMockData);

			const result = await service.createUser(userData);

			expect(result).toBeDefined();
			expect(repository.create).toHaveBeenCalledTimes(1);
			expect(repository.save).toHaveBeenCalledTimes(1);
		});

		it('should update an user', async () => {
			const id = 1;

			const userData: UpdateUserDTO = {
				username: 'Raul'
			};

			const mockResponse = {
				generatedMaps: [],
				raw: [],
				affected: 1
			};

			jest.spyOn(repository, 'update').mockResolvedValueOnce(mockResponse);

			const result = await service.updateUser(id, userData);

			expect(result).toBeDefined();
			expect(repository.update).toHaveBeenCalledTimes(1);
		});

		it('should delete an user', async () => {
			const id = 1;

			const mockResponse = {
				raw: [],
				affected: 1
			};

			jest.spyOn(repository, 'delete').mockResolvedValueOnce(mockResponse);

			const result = await service.deleteUser(id);

			expect(result).toBeDefined();
			expect(repository.delete).toHaveBeenCalledTimes(1);
		});
	});
});
