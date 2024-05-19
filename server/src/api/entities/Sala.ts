import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Sala {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  disponible!: string;

  @Column()
  numeroSala!: number;

  @Column()
  pantalla!: string;

  @Column()
  telefono!: string;

  @Column()
  wifi!: string;

  @Column()
  numeroAsientos!: number;
}
