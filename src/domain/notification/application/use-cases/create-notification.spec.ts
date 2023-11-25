import { expect, it, beforeEach, describe } from 'vitest'
import { CreateNotificationUseCase } from './create-notification'
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: CreateNotificationUseCase

describe('Create Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new CreateNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to create a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      content: 'New notification',
      title: 'Notification content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
