import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountInput } from './dto/account.dto';
import { Account } from './entity/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createAccount(account: AccountInput) {
    const res = await this.accountRepository.insert(account);
    return res.generatedMaps[0];
  }

  async updateAccount(account: AccountInput) {
    const res = await this.accountRepository.save(account);
    return res;
  }

  async getAccountListByUserId(userId: number) {
    return await this.accountRepository.find({
      relations: ['user'],
      where: { user: { id: userId } }
    })
  }
}
