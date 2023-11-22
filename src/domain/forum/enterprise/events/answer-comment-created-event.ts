import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { DomainEvent } from '../../../../core/events/domain-event'
import { AnswerComment } from '../entities/answer-comment'

export class AnswerCommentCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public answerId: UniqueEntityID
  public answerComment: AnswerComment

  constructor(answerComment: AnswerComment, answerId: UniqueEntityID) {
    this.ocurredAt = new Date()
    this.answerId = answerId
    this.answerComment = answerComment
  }

  getAggregateId(): UniqueEntityID {
    return this.answerComment.id
  }
}
