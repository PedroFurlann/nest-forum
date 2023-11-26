import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { GoogleAuthGuard } from '@/infra/auth/google-auth.guard'
import { z } from 'zod'
import { AuthService } from '@/infra/auth/auth.service'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchemaType = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private readonly authenticateStudentService: AuthenticateStudentUseCase,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchemaType) {
    const { email, password } = body

    const result = await this.authenticateStudentService.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleLogin() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async callback(@Req() req, @Res() res) {
    const jwt = await this.authService.login(req.user)
    res.set('authorization', jwt.access_token)
    res.json(req.user)
  }
}
