import { SpyInstance, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memmory-answer-attachments-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from '../../../../../test/repositories/in-memory-question-attachments-repository'
import {
  CreateNotificationUseCase,
  CreateNotificationUseCaseRequest,
  CreateNotificationUseCaseResponse,
} from '../use-cases/create-notification'
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memmory-notifications-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { waitFor } from '../../../../../test/utils/wait-for'
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chosen'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachemntsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let createNotificationUseCase: CreateNotificationUseCase

let createNotificationExecuteSpy: SpyInstance<
  [CreateNotificationUseCaseRequest],
  Promise<CreateNotificationUseCaseResponse>
>

describe('On Question Best Answer Chosen', () => {
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
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    createNotificationUseCase = new CreateNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    createNotificationExecuteSpy = vi.spyOn(
      createNotificationUseCase,
      'execute',
    )

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      createNotificationUseCase,
    )
  })

  it('should send a notification when question has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(createNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
