import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'mysql',
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT) || 3306,
			database: process.env.DB_DATABASE,
			entities: [__dirname + '/**/*.entity{.js,.ts}'],
			synchronize: true
		}),
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
