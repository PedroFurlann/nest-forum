import { Injectable } from '@nestjs/common'
import { Either, right } from '../../../../core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  { comments: CommentWithAuthor[] }
>
@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({
      comments,
    })
  }
}
