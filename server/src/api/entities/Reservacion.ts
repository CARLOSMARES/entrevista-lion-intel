import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Reservacion{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nameUsuario!: string;

    @Column()
    fecha!: Date;

    @Column()
    hora!: Date;

    @Column()
    numeroSala!: number;

}