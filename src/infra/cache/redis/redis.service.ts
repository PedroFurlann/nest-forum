import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: EnvService) {
    super({
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}
