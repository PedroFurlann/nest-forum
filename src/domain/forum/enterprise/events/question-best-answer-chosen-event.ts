import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { DomainEvent } from '../../../../core/events/domain-event'
import { Question } from '../entities/question'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityID

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.bestAnswerId = bestAnswerId
    this.question = question
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id
  }
}
