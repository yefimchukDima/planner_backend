import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: string;
}
