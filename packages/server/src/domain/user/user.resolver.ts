import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorator/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInput, User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async queryUserByName(@CurrentUser() user, @Args('name') name: string) {
    console.log(user);
    return await this.userRepository.findOneBy({ name });
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: CreateUserInput) {
    return await this.userService.createUser(user as User);
  }

  @Query(() => User)
  async queryById(@Args('id') id: number) {
    return await this.userService.queryById(id);
  }
}
