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
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type EditQuestionBodySchemaType = z.infer<typeof editQuestionBodySchema>

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private readonly editQuestionUseCase: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: EditQuestionBodySchemaType,
    @Param('id') questionId: string,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.editQuestionUseCase.execute({
      title,
      content,
      attachmentsIds: attachments,
      authorId: userId,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
