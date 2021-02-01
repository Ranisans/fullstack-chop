import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Role } from "./Role";

@Entity()
// eslint-disable-next-line import/prefer-default-export
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column("text", { unique: true })
  name: string;

  @Column("text", { unique: true })
  login: string;

  @Column("text")
  hashedPassword: string;

  @ManyToOne(() => Role, (role) => role.user)
  roleId: number;
}
