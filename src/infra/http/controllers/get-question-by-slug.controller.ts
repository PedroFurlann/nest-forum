import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { QuestionDetailsPresenter } from '../presenters/question-details-presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(
    private readonly getQuestionBySlugService: GetQuestionBySlugUseCase,
  ) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlugService.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const question = result.value.question

    return {
      question: QuestionDetailsPresenter.toHTTP(question),
    }
  }
}
