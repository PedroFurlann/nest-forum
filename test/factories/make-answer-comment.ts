import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '../../src/domain/forum/enterprise/entities/answer-comment'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answer = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
