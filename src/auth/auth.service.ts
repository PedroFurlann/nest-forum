import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    if (user) {
      return {
        access_token: this.jwtService.sign({
          sub: user.id,
        }),
      }
    } else {
      return {
        access_token: '',
      }
    }
  }
}
