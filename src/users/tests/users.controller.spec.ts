import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDTO } from '../dto/createUser.dto';
import { User as UserEntity } from '../user.entity';

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
