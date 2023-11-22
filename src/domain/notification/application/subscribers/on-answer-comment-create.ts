import { DomainEvents } from '../../../../core/events/domain-events'
import { EventHandler } from '../../../../core/events/event-handlers'
import { AnswersRepository } from '../../../forum/application/repositories/answers-repository'
import { QuestionRepository } from '../../../forum/application/repositories/question-repository'
import { AnswerCommentCreatedEvent } from '../../../forum/enterprise/events/answer-comment-created-event'
import { CreateNotificationUseCase } from '../use-cases/create-notification'

export class OnAnswerCommentCreated implements EventHandler {
  constructor(
    private answerRepository: AnswersRepository,
    private questionRepository: QuestionRepository,
    private createNotification: CreateNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerCommentNotification.bind(this),
      AnswerCommentCreatedEvent.name,
    )
  }

  private async sendNewAnswerCommentNotification({
    answerId,
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answerRepository.findById(answerId.toString())

    if (answer && answerComment) {
      const question = await this.questionRepository.findById(
        answer.questionId.toString(),
      )

      if (question && answerId === answerComment.answerId) {
        await this.createNotification.execute({
          recipientId: answer.authorId.toString(),
          title: `New comment on your answer ${answer.content.substring(
            0,
            20,
          )} on ${question.title.substring(0, 20)}`,
          content: `${answerComment.content.substring(0, 20).concat('...')}`,
        })
      }
    }
  }
}
