import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Idea } from './idea.entity';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dtos/create-idea.dto';
import { User } from 'src/users/user.entity';
import { UpdateIdeaDto } from './dtos/update-idea.dto';

@Injectable()
export class IdeasService {
  constructor(@InjectRepository(Idea) private repository: Repository<Idea>) {}

  async create(createIdeaPayload: CreateIdeaDto, currentUser: User) {
    const { title, description } = createIdeaPayload;
    const idea = this.repository.create({
      title,
      description,
      user: currentUser,
    });
    const createdIdea = await this.repository.save(idea);
    return {
      message: 'Idea created successfully',
      idea: createdIdea,
    };
  }

  async findAll(currentUser: User) {
    const ideas = await this.repository.find({
      where: { user: currentUser },
    });
    return ideas;
  }

  async findOne(id: number) {
    const idea = await this.repository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
        },
      },
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    return idea;
  }

  async update(
    id: number,
    updateIdeaPayload: UpdateIdeaDto,
    currentUser: User,
  ) {
    const idea = await this.findOne(id);

    await this.isGrantedAccess(idea, currentUser);

    Object.assign(idea, updateIdeaPayload);
    const updatedIdea = await this.repository.save(idea);

    return {
      message: 'Idea updated successfully',
      idea: updatedIdea,
    };
  }

  async delete(id: number, currentUser: User) {
    const idea = await this.findOne(id);

    await this.isGrantedAccess(idea, currentUser);
    await this.repository.remove(idea);
    return {
      message: 'Idea deleted successfully',
    };
  }

  async isGrantedAccess(idea: Idea, currentUser: User) {
    if (idea.user.id !== currentUser.id) {
      throw new ForbiddenException('You are not allowed to access this idea');
    }
  }
}
