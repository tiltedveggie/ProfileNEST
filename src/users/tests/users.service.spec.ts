import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User as UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/createUser.dto';
import { usersMock } from './mocks/users.mock';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { Profile as ProfileEntity } from '../profile.entity';
import { CreateProfileDTO } from '../dto/createProfile.dto';

describe('UsersService', () => {
	let service: UsersService;
	let usersRepository: Repository<UserEntity>;
	let profilesRepository: Repository<ProfileEntity>;

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
				},
				{
					provide: getRepositoryToken(ProfileEntity),
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
		usersRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity)
		);
		profilesRepository = module.get<Repository<ProfileEntity>>(
			getRepositoryToken(ProfileEntity)
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(usersRepository).toBeDefined();
		expect(profilesRepository).toBeDefined();
	});

	describe('database methods', () => {
		it('should return an array of users', async () => {
			const users = usersMock;

			jest.spyOn(usersRepository, 'find').mockResolvedValueOnce(users);

			const result = await service.getUsers();

			expect(result).toBeDefined();
			expect(usersRepository.find).toHaveBeenCalledTimes(1);
		});

		it('should create an user', async () => {
			const userData: CreateUserDTO = {
				username: 'Raul',
				password: 'raulpassword19'
			};

			const userMockData = { ...userData } as UserEntity;

			jest.spyOn(usersRepository, 'create').mockReturnValueOnce(userMockData);
			jest.spyOn(usersRepository, 'save').mockResolvedValueOnce(userMockData);

			const result = await service.createUser(userData);

			expect(result).toBeDefined();
			expect(usersRepository.create).toHaveBeenCalledTimes(1);
			expect(usersRepository.save).toHaveBeenCalledTimes(1);
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

			jest
				.spyOn(usersRepository, 'findOne')
				.mockResolvedValueOnce(usersMock[0]);
			jest.spyOn(usersRepository, 'update').mockResolvedValueOnce(mockResponse);

			const result = await service.updateUser(id, userData);

			expect(result).toBeDefined();
			expect(usersRepository.update).toHaveBeenCalledTimes(1);
		});

		it('should delete an user', async () => {
			const id = 1;

			const mockResponse = {
				raw: [],
				affected: 1
			};

			jest.spyOn(usersRepository, 'delete').mockResolvedValueOnce(mockResponse);

			const result = await service.deleteUser(id);

			expect(result).toBeDefined();
			expect(usersRepository.delete).toHaveBeenCalledTimes(1);
		});
	});

	describe('database methods 2', () => {
		it('should create an user profile', async () => {
			const id = 1;

			const userProfile: CreateProfileDTO = {
				firstname: 'Raul',
				lastname: 'Armando',
				age: 35
			};

			const userMockData = { ...userProfile } as ProfileEntity;

			jest
				.spyOn(usersRepository, 'findOne')
				.mockResolvedValueOnce(usersMock[0]);
			jest
				.spyOn(profilesRepository, 'create')
				.mockReturnValueOnce(userMockData);
			jest.spyOn(usersRepository, 'save').mockResolvedValueOnce(usersMock[0]);

			const result = await service.createProfile(id, userProfile);

			expect(result).toBeDefined();
			expect(profilesRepository.create).toHaveBeenCalledTimes(1);
			expect(usersRepository.save).toHaveBeenCalledTimes(1);
		});
	});
});
