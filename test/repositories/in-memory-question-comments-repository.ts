import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { DomainEvents } from '../../src/core/events/domain-events'
import { PaginationParams } from '../../src/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '../../src/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '../../src/domain/forum/enterprise/entities/question-comment'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  constructor(
    private readonly studentsRepository: InMemoryStudentsRepository,
  ) {}

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) => {
          return student.id.equals(comment.authorId)
        })

        if (!author) {
          throw new Error(
            `Author with ID "${comment.authorId.toString()}" does not exist`,
          )
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          authorName: author.name,
        })
      })

    return questionComments
  }

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)

    DomainEvents.dispatchEventsForAggregate(questionComment.id)
  }
}
