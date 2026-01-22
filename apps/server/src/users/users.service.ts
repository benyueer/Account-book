import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(password: string, name?: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.usersRepository.create({
      password: hashedPassword,
      name,
    })
    return this.usersRepository.save(user)
  }

  async findByUsername(name: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { name } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } })
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password)
  }
}
