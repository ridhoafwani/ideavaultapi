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
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dtos/create-idea.dto';
import { UsersGuard } from 'src/users/users.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { UpdateIdeaDto } from './dtos/update-idea.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Ideas')
@Controller('ideas')
@ApiBearerAuth('accessToken')
@UseGuards(UsersGuard)
export class IdeasController {
  constructor(private ideasService: IdeasService) {}

  @Post()
  async create(
    @Body() createIdeaPayload: CreateIdeaDto,
    @GetUser() currentUser: User,
  ) {
    return await this.ideasService.create(createIdeaPayload, currentUser);
  }

  @Get()
  async get(@GetUser() currentUser: User) {
    return await this.ideasService.findAll(currentUser);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.ideasService.findOne(id);
  }

  @Put(':id')
  async update(
    @GetUser() currentUser: User,
    @Param('id') id: number,
    @Body() updateIdeaPayload: UpdateIdeaDto,
  ) {
    return await this.ideasService.update(id, updateIdeaPayload, currentUser);
  }

  @Delete(':id')
  async delete(@GetUser() currentUser: User, @Param('id') id: number) {
    return await this.ideasService.delete(id, currentUser);
  }
}
