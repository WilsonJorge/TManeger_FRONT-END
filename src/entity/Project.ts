import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm"
import { Task } from "./Task";
@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectName: string

    @Column({ type: "date" }) 
    startDate: Date;

    @Column({ type: "date" }) 
    endDate: Date;

    @Column({
        type: "enum",
        enum: ["Interno", "Externo"]
    })
    projectCategory :string

    @Column()
    country: String

    @Column()
    telephone : number

    @Column()
     company : string

     @Column()
     companyPhone : number

     @Column()
     city: string

     @Column()
     Andress : string
     
     @OneToMany(() => Task, task => task.project)
     tasks: Task[];


}