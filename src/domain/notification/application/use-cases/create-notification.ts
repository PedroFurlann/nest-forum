import { Injectable } from '@nestjs/common'
import { Either, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

export interface CreateNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type CreateNotificationUseCaseResponse = Either<
  null,
  { notification: Notification }
>

@Injectable()
export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: CreateNotificationUseCaseRequest): Promise<CreateNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      content,
      title,
    })

    await this.notificationRepository.create(notification)

    return right({
      notification,
    })
  }
}
