import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  content: string;

  @IsEnum(MessageRole)
  @IsNotEmpty()
  role: MessageRole;
}
