import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum SummaryStatus {
  PENDING = 'pending', // 作成中
  APPROVED = 'approved', // 承認済み
  SAVED = 'saved', // 保存済み
}

export class CreateSummaryDto {
  @IsString()
  @IsNotEmpty()
  title: string; // サマリーのタイトル

  @IsString()
  @IsNotEmpty()
  content: string; // サマリーの内容

  @IsEnum(SummaryStatus)
  @IsNotEmpty()
  status: SummaryStatus; // サマリーの状態

  @IsOptional()
  @IsString()
  notionUrl?: string; // NotionのURL（オプション）
}
