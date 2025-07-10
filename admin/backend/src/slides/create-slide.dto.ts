import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSlideDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  threadId?: number;
}
