import { Injectable } from '@nestjs/common'
import { DomainEvents } from '../../../../core/events/domain-events'
import { EventHandler } from '../../../../core/events/event-handlers'
import { QuestionRepository } from '../../../forum/application/repositories/question-repository'
import { AnswerCreatedEvent } from '../../../forum/enterprise/events/answer-created-event'
import { CreateNotificationUseCase } from '../use-cases/create-notification'

@Injectable()
export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionRepository,
    private createNotification: CreateNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.createNotification.execute({
        recipientId: question.authorId.toString(),
        title: `New answer on "${question.title
          .substring(0, 40)
          .concat('...')}" `,
        content: answer.excerpt,
      })
    }
  }
}
