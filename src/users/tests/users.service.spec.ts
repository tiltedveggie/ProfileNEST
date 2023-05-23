import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
	let service: UsersService;
	let repository: Repository<User>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						findOne: jest.fn()
					}
				}
			]
		}).compile();

		service = module.get<UsersService>(UsersService);
		repository = module.get<Repository<User>>(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(repository).toBeDefined();
	});
});
