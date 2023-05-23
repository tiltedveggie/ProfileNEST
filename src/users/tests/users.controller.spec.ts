import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

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
						create: jest.fn(),
						save: jest.fn(),
						findOne: jest.fn()
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
});
