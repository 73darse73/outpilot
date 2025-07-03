import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SummaryStatus } from './create-summary.dto';

export class UpdateSummaryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(SummaryStatus)
  status?: SummaryStatus;

  @IsOptional()
  @IsString()
  notionUrl?: string;
}
