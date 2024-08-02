import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entitiy';
import { IdeasModule } from '../ideas/ideas.module';
import { FeedbacksUserController } from './feedbacks-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]), IdeasModule],
  controllers: [FeedbacksController, FeedbacksUserController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
