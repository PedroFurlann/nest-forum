import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { DomainEvents } from '../../src/core/events/domain-events'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }

  async findByEmail(email: string) {
    const question = this.items.find((item) => item.email.toString() === email)

    if (!question) {
      return null
    }

    return question
  }
}
