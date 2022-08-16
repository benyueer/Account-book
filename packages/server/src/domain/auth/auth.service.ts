import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login({ name, password, id }: any) {
    const payload = { username: name, password, id };
    return {
      access_token: this.jwtService.sign(payload),
      id,
    };
  }
}
