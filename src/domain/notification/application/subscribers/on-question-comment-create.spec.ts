import { SpyInstance, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository'
import {
  CreateNotificationUseCase,
  CreateNotificationUseCaseRequest,
  CreateNotificationUseCaseResponse,
} from '../use-cases/create-notification'
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { waitFor } from '../../../../../test/utils/wait-for'
import { OnQuestionCommentCreated } from './on-question-comment-create'
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachemntsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let createNotificationUseCase: CreateNotificationUseCase

let createNotificationExecuteSpy: SpyInstance<
  [CreateNotificationUseCaseRequest],
  Promise<CreateNotificationUseCaseResponse>
>

describe('On Question Comment Created', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachemntsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachemntsRepository,
    )

    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    createNotificationUseCase = new CreateNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    createNotificationExecuteSpy = vi.spyOn(
      createNotificationUseCase,
      'execute',
    )

    new OnQuestionCommentCreated(
      inMemoryQuestionsRepository,
      createNotificationUseCase,
    )
  })

  it('should send a notification when a question comment is created', async () => {
    const question = makeQuestion()
    const questionComment = makeQuestionComment({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryQuestionCommentRepository.create(questionComment)

    await waitFor(() => {
      expect(createNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
