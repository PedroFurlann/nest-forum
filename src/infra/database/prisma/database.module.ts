import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionCommentsRepository,
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionsRepository,
    },
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionCommentsRepository,
    QuestionRepository,
  ],
})
export class DatabaseModule {}
