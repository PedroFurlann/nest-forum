import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id,
      },
    })

    if (!notification) {
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification)

    await this.prismaService.notification.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification)

    await this.prismaService.notification.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
