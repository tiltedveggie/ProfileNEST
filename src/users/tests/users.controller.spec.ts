import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDTO } from '../dto/createUser.dto';
import { User as UserEntity } from '../user.entity';
import { usersMock } from './mocks/users.mock';

describe('UsersController', () => {
	let service: UsersService;
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [],
			controllers: [UsersController],
			providers: [
				UsersService,
				{
					provide: UsersService,
					useValue: {
						getUsers: jest.fn(),
						createUser: jest.fn()
					}
				}
			]
		}).compile();

		service = module.get<UsersService>(UsersService);
		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(controller).toBeDefined();
	});

	describe('database methods', () => {
		it('should return an array of users', async () => {
			const users = usersMock;

			jest.spyOn(service, 'getUsers').mockResolvedValueOnce(users);

			const result = await service.getUsers();

			expect(result).toBeDefined();
			expect(service.getUsers).toHaveBeenCalledTimes(1);
		});

		it('should create an user', async () => {
			const body: CreateUserDTO = {
				username: 'Raul',
				password: 'raulpassword19'
			};

			const userMockData = { ...body } as UserEntity;

			jest.spyOn(service, 'createUser').mockResolvedValueOnce(userMockData);

			const result = await controller.createUser(body);

			expect(result).toBeDefined();
			expect(service.createUser).toHaveBeenCalledTimes(1);
		});
	});
});
