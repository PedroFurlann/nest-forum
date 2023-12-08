import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'

import { faker } from '@faker-js/faker'
import {
  Notification,
  NotificationProps,
} from '../../src/domain/notification/enterprise/entities/notification'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notification-mapper'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      title: faker.lorem.sentence(4),
      recipientId: new UniqueEntityID(),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}

@Injectable()
export class NotificationFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaNotification(
    data: Partial<NotificationProps> = {},
  ): Promise<Notification> {
    const notification = makeNotification(data)

    await this.prismaService.notification.create({
      data: PrismaNotificationMapper.toPersistence(notification),
    })

    return notification
  }
}
