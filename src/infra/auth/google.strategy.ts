import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { EnvService } from '../env/env.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const googleClientId = env.get('GOOGLE_CLIENT_ID')
    const googleClientSecretKey = env.get('GOOGLE_CLIENT_SECRET_KEY')

    super({
      clientID: googleClientId,
      clientSecret: googleClientSecretKey,
      callbackURL: 'http://localhost:3333/session/google/callback',
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: any,
    done: VerifyCallback,
  ) {
    done(null, profile)
  }
}
