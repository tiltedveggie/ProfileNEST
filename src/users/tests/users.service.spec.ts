import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User as UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/createUser.dto';

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
						create: jest.fn(),
						save: jest.fn(),
						findOne: jest.fn()
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
	});
});
