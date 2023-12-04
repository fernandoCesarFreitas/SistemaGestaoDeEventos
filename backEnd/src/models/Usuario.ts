import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Inscricoes } from "./Inscricoes";

@Entity("usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ unique: true }) // usuario unico
  email: string;

  @Column({ select: false }) //nenhuma consulta ira retornar a senha
  senha: string;

  @Column({ length: 20 })
  telefone: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ length: 255 })
  numero: string;

  @Column({ length: 255 })
  bairro: string;

  @Column({ length: 255 })
  cidade: string;

  @Column({ length: 255 })
  estado: string;

  @Column({ nullable: true})
  complemento: string;

  @Column({ length: 2 })
  genero: string;

  @Column({})
  status: boolean;

  @Column({ length: 255 })
  dataNascimento: string;

  @Column({ nullable: true })
  admin: boolean;

  @OneToMany(() => Inscricoes, (inscricoes) => inscricoes.usuario_id)
  usuarios: Inscricoes[];
}
