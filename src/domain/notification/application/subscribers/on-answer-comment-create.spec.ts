import { SpyInstance, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachments-repository'
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
import { OnAnswerCommentCreated } from './on-answer-comment-create'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachemntsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let createNotificationUseCase: CreateNotificationUseCase

let createNotificationExecuteSpy: SpyInstance<
  [CreateNotificationUseCaseRequest],
  Promise<CreateNotificationUseCaseResponse>
>

describe('On Answer Comment Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryQuestionsAttachemntsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachemntsRepository,
    )
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    createNotificationUseCase = new CreateNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    createNotificationExecuteSpy = vi.spyOn(
      createNotificationUseCase,
      'execute',
    )

    new OnAnswerCommentCreated(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
      createNotificationUseCase,
    )
  })

  it('should send a notification when an answer comment is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })
    const answerComment = makeAnswerComment({
      answerId: answer.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)
    inMemoryAnswerCommentRepository.create(answerComment)

    await waitFor(() => {
      expect(createNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
