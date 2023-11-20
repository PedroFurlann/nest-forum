import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Env } from 'src/env'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const googleClientId = config.get('GOOGLE_CLIENT_ID', { infer: true })
    const googleClientSecretKey = config.get('GOOGLE_CLIENT_SECRET_KEY', {
      infer: true,
    })

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
    profile: any,
    done: VerifyCallback,
  ) {
    done(null, profile)
  }
}
