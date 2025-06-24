import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ThreadsService {
  constructor(private prisma: PrismaService) {}

  async create(title: string) {
    return this.prisma.thread.create({
      data: { title }
    });
  }

  async findAll() {
    return this.prisma.thread.findMany({
      include: {
        _count: {
          select: {
            messages: true,
            summaries: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.thread.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        summaries: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  }

  async update(id: number, title: string) {
    return this.prisma.thread.update({
      where: { id },
      data: { title }
    });
  }

  async remove(id: number) {
    return this.prisma.thread.delete({
      where: { id }
    });
  }
} 