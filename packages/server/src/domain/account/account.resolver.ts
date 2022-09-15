import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import { AccountInput } from './dto/account.dto';
import { Account } from './entity/account.entity';

@Resolver()
export class AccountResolver {
  constructor(private accountService: AccountService) {}
  /**
   * 新建账户
   */
  // @UseGuards(AuthGuard)
  @Mutation(() => Account)
  async createAccount(@Args('data') data: AccountInput) {
    return await this.accountService.createAccount(data);
  }

  /**
   * 修改账户
   */
  @Mutation(() => Account)
  async updateAccount(@Args('data') data: AccountInput) {
    return await this.accountService.updateAccount(data);
  }
}
