import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-answer-attachments-repository'
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository'
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository'
import { PrismaAnswersRepository } from './repositories/prisma-answers-repository'
import { PrismaQuestionCommentsRepository } from './repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './repositories/prisma-students-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentsRepository,
    QuestionAttachmentsRepository,
    AnswerCommentsRepository,
    StudentsRepository,
    AnswersRepository,
    QuestionCommentsRepository,
    QuestionRepository,
  ],
})
export class DatabaseModule {}
