import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPersistence(attachment)

    await this.prismaService.attachment.create({
      data,
    })
  }
}
