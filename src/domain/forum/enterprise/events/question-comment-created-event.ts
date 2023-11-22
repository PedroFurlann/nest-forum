import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { DomainEvent } from '../../../../core/events/domain-event'
import { QuestionComment } from '../entities/question-comment'

export class QuestionCommentCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public questionId: UniqueEntityID
  public questionComment: QuestionComment

  constructor(questionComment: QuestionComment, questionId: UniqueEntityID) {
    this.ocurredAt = new Date()
    this.questionId = questionId
    this.questionComment = questionComment
  }

  getAggregateId(): UniqueEntityID {
    return this.questionComment.id
  }
}
