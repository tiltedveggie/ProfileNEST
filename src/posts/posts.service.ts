import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dto/createPost.dto';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post) private postsRepository: Repository<Post>,
		private usersService: UsersService
	) {}

	async getPosts() {
		return await this.postsRepository.find({ relations: ['author'] });
	}

	async createPost(post: CreatePostDTO) {
		const userFound = await this.usersService.getOneUser(post.authorId);

		if (!userFound) {
			return new HttpException('User not found!', HttpStatus.NOT_FOUND);
		}

		const newPost = this.postsRepository.create(post);

		return await this.postsRepository.save(newPost);
	}
}
