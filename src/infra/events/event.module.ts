import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { CreateNotificationUseCase } from '@/domain/notification/application/use-cases/create-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    CreateNotificationUseCase,
  ],
})
export class EventsModule {}
