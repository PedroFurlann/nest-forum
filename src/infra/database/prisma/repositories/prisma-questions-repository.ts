import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prismaService.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prismaService.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPersistence(question)

    await this.prismaService.question.create({
      data,
    })
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPersistence(question)

    await this.prismaService.question.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPersistence(question)

    await this.prismaService.question.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prismaService.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map((question) => PrismaQuestionMapper.toDomain(question))
  }
}
