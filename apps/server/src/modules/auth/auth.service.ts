import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LedgersService } from '../ledgers/ledgers.service'
import { UsersService } from '../users/users.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private ledgersService: LedgersService,
  ) { }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(registerDto.name)
    if (existingUser) {
      throw new UnauthorizedException('Username already exists')
    }

    const user = await this.usersService.create(
      registerDto.password,
      registerDto.name,
    )

    // 创建默认账本
    await this.ledgersService.createDefaultLedgers(user.id)

    return this.generateTokens(user.id, user.name)
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.name)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      loginDto.password,
    )
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return this.generateTokens(user.id, user.name)
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username)
    if (!user) {
      return null
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      password,
    )
    if (!isPasswordValid) {
      return null
    }

    return user
  }

  private generateTokens(userId: string, name: string) {
    const payload = { sub: userId, name }
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: userId, name },
    }
  }
}
