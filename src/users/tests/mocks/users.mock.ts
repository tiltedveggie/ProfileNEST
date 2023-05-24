import { User } from '../../../../src/users/user.entity';

export const usersMock: User[] = [
	{
		id: 1,
		username: 'hola1',
		password: 'holaxd1',
		createdAt: new Date(),
		authStrategy: null
	},
	{
		id: 2,
		username: 'hola2',
		password: 'holaxd2',
		createdAt: new Date(),
		authStrategy: null
	},
	{
		id: 3,
		username: 'hola3',
		password: 'holaxd3',
		createdAt: new Date(),
		authStrategy: null
	}
];
