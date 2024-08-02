import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksUserController } from './feedbacks-user.controller';

describe('FeedbacksUserController', () => {
  let controller: FeedbacksUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksUserController],
    }).compile();

    controller = module.get<FeedbacksUserController>(FeedbacksUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
