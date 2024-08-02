import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { UsersGuard } from 'src/users/users.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedbacks')
@ApiBearerAuth('accessToken')
@Controller()
@UseGuards(UsersGuard)
export class FeedbacksUserController {
  constructor(private feedbacksService: FeedbacksService) {}

  @Get('users/:userId/feedbacks')
  async getManyByUserId(@Param('userId') userId: number) {
    return await this.feedbacksService.findManyByUserId(userId);
  }
}
