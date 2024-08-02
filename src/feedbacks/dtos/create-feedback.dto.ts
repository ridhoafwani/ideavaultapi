import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
