import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account, ACCOUNT_TYPE } from './entity/account.entity';
import { AccountResolver } from './account.resolver';
import { registerEnumType } from '@nestjs/graphql';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AccountResolver],
})
export class AccountModule {
  constructor() {
    registerEnumType(ACCOUNT_TYPE, { name: 'ACCOUNT_TYPE' });
  }
}
