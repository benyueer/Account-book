import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import {
  Connection,
  DataSource,
  getConnection,
  getConnectionManager,
  getManager,
  Repository,
} from 'typeorm';
import { AccountService } from '../account/account.service';
import { Account, ACCOUNT_TYPE } from '../account/entity/account.entity';
import { Family } from '../family/entity/family.entity';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async queryByname(name: string) {
    const res = await this.userRepository.find({
      relations: ['family'],
      where: { name }
    });
    return res[0] || null;
  }

  async queryById(id: number) {
    const res = await this.userRepository.find({
      relations: ['family'],
      where: { id }
    });
    return res[0];
  }

  /**
   * 新建用户
   * @param user
   * @returns
   */
  async createUser(user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 创建默认家庭
      let familyEntity = new Family();
      familyEntity.name = '默认家庭';
      familyEntity = await queryRunner.manager.save(familyEntity);
      // 创建用户
      user.family = familyEntity;
      let userEntity = new User();
      Object.assign(userEntity, { ...user });
      userEntity = await queryRunner.manager.save<User>(userEntity);
      // 创建现金账户
      const account = new Account();
      Object.assign(account, {
        name: '现金账户',
        incomeCount: 0,
        no: '0',
        overage: 0,
        costCount: 0,
        type: ACCOUNT_TYPE.CASH,
        user: userEntity,
      });
      await queryRunner.manager.save<Account>(account);
      return userEntity;
    } catch (e) {
      Logger.error(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
