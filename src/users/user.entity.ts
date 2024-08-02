import { Exclude } from 'class-transformer';
import { Feedback } from 'src/feedbacks/feedback.entitiy';
import { Idea } from 'src/ideas/idea.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Idea, (idea) => idea.user, { onDelete: 'CASCADE' })
  ideas: Idea[];

  @OneToMany(() => Feedback, (feedback) => feedback.user, {
    onDelete: 'CASCADE',
  })
  feedbacks: Feedback[];
}
