import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersGuard } from 'src/users/users.guard';
import { FeedbacksService } from './feedbacks.service';
import { UpdateFeedbackDto } from './dtos/update-feedback.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedbacks')
@ApiBearerAuth('accessToken')
@Controller()
@UseGuards(UsersGuard)
export class FeedbacksController {
  constructor(private feedbacksService: FeedbacksService) {}

  @Post('ideas/:ideaId/feedbacks')
  async create(
    @Body() createFeedbackPayload: CreateFeedbackDto,
    @GetUser() currentUser: User,
    @Param('ideaId') ideaId: number,
  ) {
    return await this.feedbacksService.create(
      createFeedbackPayload,
      currentUser,
      ideaId,
    );
  }

  @Get('ideas/:ideaId/feedbacks')
  async getManyByIdeaId(@Param('ideaId') ideaId: number) {
    return await this.feedbacksService.findManyByIdeaId(ideaId);
  }

  @Get('feedbacks/:feedbackId')
  async getOne(@Param('feedbackId') feedbackId: number) {
    return await this.feedbacksService.findOne(feedbackId);
  }

  @Put('feedbacks/:feedbackId')
  async update(
    @Param('feedbackId') feedbackId: number,
    @Body() updateFeedbackPayload: UpdateFeedbackDto,
    @GetUser() currentUser: User,
  ) {
    return await this.feedbacksService.update(
      updateFeedbackPayload,
      feedbackId,
      currentUser,
    );
  }

  @Delete('feedbacks/:feedbackId')
  async delete(
    @Param('feedbackId') feedbackId: number,
    @GetUser() currentUser: User,
  ) {
    return await this.feedbacksService.delete(feedbackId, currentUser);
  }
}
