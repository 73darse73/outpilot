import { Controller, Get, Post, Body } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.create(createThreadDto.title);
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }
}
