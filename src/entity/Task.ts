import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { Project } from "./Project";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: "date" }) 
    startDate: Date;

    @Column({ type: "date" }) 
    endDate: Date;

    @Column()
    assignTo: string;

    @Column()
    Description: string;

    @Column({
        type: "enum",
        enum: ["EM progresso", "Em Espera", "Concluido"]
    })
    taskStatus: string;

    @Column({
        type: "enum",
        enum: ["Alta", "Baixa", "Média"]
    })
    priority: string;

    @Column({ nullable: true })
    filePath: string;

    @ManyToOne(() => Category, category => category.tasks)
    category: Category;

    @ManyToOne(() => Project, project => project.tasks)
    project: Project;
}

