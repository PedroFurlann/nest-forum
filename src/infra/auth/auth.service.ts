import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: unknown) {
    if (user) {
      return {
        access_token: this.jwtService.sign({
          sub: randomUUID(),
        }),
      }
    } else {
      return {
        access_token: '',
      }
    }
  }
}
