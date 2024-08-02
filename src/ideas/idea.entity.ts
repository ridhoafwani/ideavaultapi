import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Feedback } from '../feedbacks/feedback.entitiy';

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.ideas, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Feedback, (feedback) => feedback.idea, {
    onDelete: 'CASCADE',
  })
  feedbacks: Feedback[];
}
