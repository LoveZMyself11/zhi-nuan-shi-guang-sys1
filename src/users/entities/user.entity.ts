import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  ELDER = 'ELDER',
  PROXY = 'PROXY',
}

@Entity('SYS_USER')
export class User {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME', length: 100, nullable: false })
  name: string;

  @Column({ name: 'PHONE', length: 20, nullable: true })
  phone: string;

  @Column({ name: 'AGE', type: 'number', nullable: true })
  age: number;

  @Column({
    name: 'ROLE',
    type: 'varchar2',
    length: 20,
    nullable: false,
    default: UserRole.ELDER,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp' })
  created_at: Date;
}
