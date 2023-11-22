import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'

import { faker } from '@faker-js/faker'
import {
  Notification,
  NotificationProps,
} from '../../src/domain/notification/enterprise/entities/notification'

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
