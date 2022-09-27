import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column()
    password: string;

    @OneToMany(type => Task, task => task.owner)
    tasks: Task[]
}