import { DomainEvents } from '../../../../core/events/domain-events'
import { EventHandler } from '../../../../core/events/event-handlers'
import { AnswersRepository } from '../../../forum/application/repositories/answers-repository'
import { QuestionBestAnswerChosenEvent } from '../../../forum/enterprise/events/question-best-answer-chosen-event'
import { CreateNotificationUseCase } from '../use-cases/create-notification'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private createNotification: CreateNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.createQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async createQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.createNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Your answer was choosen!`,
        content: `The answer that you sent on "${question.title
          .substring(0, 20)
          .concat('...')}" was choosen by the author!`,
      })
    }
  }
}
