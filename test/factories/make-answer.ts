import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Answer,
  AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answer
}
