import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;  // Make it optional for creation

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
