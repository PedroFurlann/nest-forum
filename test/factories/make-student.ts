import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}
