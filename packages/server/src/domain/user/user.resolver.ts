import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, User } from './entity/user.entity';

@Resolver()
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Query(() => User)
  async queryUserByName(@Args('name') name: string) {
    return await this.userRepository.findOneBy({ name });
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: CreateUserInput) {
    const res = await this.userRepository.insert(user);
    console.log(res);
    return res.identifiers[0];
  }
}
