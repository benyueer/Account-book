import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorator/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInput, User } from './entity/user.entity';

@Resolver()
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async queryUserByName(@CurrentUser() user, @Args('name') name: string) {
    console.log(user);
    return await this.userRepository.findOneBy({ name });
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: CreateUserInput) {
    const res = await this.userRepository.insert(user);
    console.log(res);
    return res.identifiers[0];
  }
}
