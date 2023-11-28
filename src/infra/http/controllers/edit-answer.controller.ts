import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const editAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

type EditAnswerBodySchemaType = z.infer<typeof editAnswerBodySchema>

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private readonly editAnswerUseCase: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditAnswerBodySchemaType,
    @Param('id') answerId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.editAnswerUseCase.execute({
      answerId,
      content,
      attachmentsIds: [],
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
