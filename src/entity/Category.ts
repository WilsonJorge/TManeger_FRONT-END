import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria: string;

  @Column()
  numeroCategoria: number;

  @OneToMany(() => Task, task => task.category)
    tasks: Task[];
}

