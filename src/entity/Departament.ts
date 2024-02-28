import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Departament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departamento: string;

  @Column()
  numeroColaboradores: number;

}