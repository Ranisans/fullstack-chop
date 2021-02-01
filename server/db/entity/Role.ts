import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
// eslint-disable-next-line import/prefer-default-export
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.roleId)
  user: User[];
}
