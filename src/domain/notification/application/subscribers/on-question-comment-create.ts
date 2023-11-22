import { DomainEvents } from '../../../../core/events/domain-events'
import { EventHandler } from '../../../../core/events/event-handlers'
import { QuestionRepository } from '../../../forum/application/repositories/question-repository'
import { QuestionCommentCreatedEvent } from '../../../forum/enterprise/events/question-comment-created-event'
import { CreateNotificationUseCase } from '../use-cases/create-notification'

export class OnQuestionCommentCreated implements EventHandler {
  constructor(
    private questionRepository: QuestionRepository,
    private createNotification: CreateNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionCommentCreatedNotification.bind(this),
      QuestionCommentCreatedEvent.name,
    )
  }

  private async sendNewQuestionCommentCreatedNotification({
    questionComment,
    questionId,
  }: QuestionCommentCreatedEvent) {
    const question = await this.questionRepository.findById(
      questionId.toString(),
    )

    if (question && questionComment) {
      if (questionId === questionComment.questionId) {
        await this.createNotification.execute({
          recipientId: question.authorId.toString(),
          title: `New comment on your question: ${question.title.substring(
            0,
            20,
          )}`,
          content: questionComment.content.substring(0, 40),
        })
      }
    }
  }
}
