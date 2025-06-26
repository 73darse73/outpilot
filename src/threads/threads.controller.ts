import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { ThreadDto, ThreadDetailDto } from './dto/thread.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  async create(@Body() createThreadDto: CreateThreadDto): Promise<ThreadDto> {
    return this.threadsService.create(createThreadDto.title);
  }

  @Get()
  async findAll(): Promise<ThreadDto[]> {
    return this.threadsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ThreadDetailDto> {
    const thread = await this.threadsService.findOne(id);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    return thread;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createThreadDto: CreateThreadDto,
  ): Promise<ThreadDto> {
    const thread = await this.threadsService.update(id, createThreadDto.title);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    return thread;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ThreadDto> {
    try {
      return await this.threadsService.remove(id);
    } catch {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
  }
}
