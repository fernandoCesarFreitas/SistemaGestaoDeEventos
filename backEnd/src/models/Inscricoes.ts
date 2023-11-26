import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Eventos } from "./Eventos";
import { Usuario } from "./Usuario";

@Entity("inscricoes")
export class Inscricoes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: "now()" })
  dataHora: string;

  @Column({ length: 255 })
  status: string;

  @Column({})
  checkin: boolean;

  evento_id: number;

  @ManyToOne(() => Eventos, (evento) => evento.inscricoesRealizadas, {
    eager: true,
  })
  @JoinColumn({ name: "evento_id" })
  eventos: Eventos;

  usuario_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarios, { eager: true })
  @JoinColumn({ name: "usuario_id" })
  usuarios: Usuario;
}
