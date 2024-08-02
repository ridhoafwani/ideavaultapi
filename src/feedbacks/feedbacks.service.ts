import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeasService } from '../ideas/ideas.service';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { User } from 'src/users/user.entity';
import { UpdateFeedbackDto } from './dtos/update-feedback.dto';
import { Feedback } from './feedback.entitiy';

Injectable();
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private ideaService: IdeasService,
  ) {}

  async create(
    feedbackPayload: CreateFeedbackDto,
    currentUser: User,
    ideaId: number,
  ) {
    const idea = await this.ideaService.findOne(ideaId);
    const feedback = this.feedbackRepository.create({
      ...feedbackPayload,
      idea,
      user: currentUser,
    });

    const createdFeedback = await this.feedbackRepository.save(feedback);

    return {
      message: 'Feedback created successfully',
      feedback: createdFeedback,
    };
  }

  async findOne(feedbackId: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id: feedbackId },
      relations: ['user', 'idea'],
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
        },
        idea: {
          id: true,
        },
      },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    return feedback;
  }

  async findManyByIdeaId(ideaId: number) {
    const feedbacks = await this.feedbackRepository.find({
      where: { idea: { id: ideaId } },
      relations: ['user'],
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
        },
      },
    });

    return feedbacks;
  }

  async findManyByUserId(userId: number) {
    const feedbacks = await this.feedbackRepository.find({
      where: { user: { id: userId } },
      relations: ['idea'],
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        idea: {
          id: true,
        },
      },
    });

    return feedbacks;
  }

  async update(
    updateFeedbackPayload: UpdateFeedbackDto,
    feedbackId: number,
    currentUser: User,
  ) {
    const feedback = await this.findOne(feedbackId);

    await this.isGrantedAccess(feedback, currentUser);

    Object.assign(feedback, updateFeedbackPayload);
    const updatedFeedback = await this.feedbackRepository.save(feedback);

    return {
      message: 'Feedback updated successfully',
      feedback: updatedFeedback,
    };
  }

  async delete(feedbackId: number, currentUser: User) {
    const feedback = await this.findOne(feedbackId);

    await this.isGrantedAccess(feedback, currentUser);
    await this.feedbackRepository.remove(feedback);
    return {
      message: 'Feedback deleted successfully',
    };
  }

  async isGrantedAccess(feedback: Feedback, currentUser: User) {
    if (feedback.user.id !== currentUser.id) {
      throw new ForbiddenException(
        'You are not allowed to access this feedback',
      );
    }
  }
}
