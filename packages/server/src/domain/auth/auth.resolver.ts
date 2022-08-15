import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Token } from './entity/auth.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation(() => Token)
  async login(@Args('name') name: string, @Args('password') password: string) {
    const user = await this.userService.queryByname(name);
    console.log(user);
    if (user && user.password === password) {
      return this.authService.login({ name, password, id: user.id });
    }
    return {
      acsess_token: '',
    };
  }
}
