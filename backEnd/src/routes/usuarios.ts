import { Router, Request, Response, NextFunction } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { Usuario } from "../models/Usuario";
import * as yup from "yup";
import { Not } from "typeorm";
let usuarioController: UsuarioController = new UsuarioController();

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    email: yup.string().email().required(),
    senha: yup.string().min(5).max(255).required(),
    cpf: yup.string().min(10).max(11).required(),
    telefone: yup.string().min(8).max(15).required(),
    endereco: yup.string().min(3).max(255).required(),
    numero: yup.string().min(1).max(255).required(),
    bairro: yup.string().min(3).max(255).required(),
    cidade: yup.string().min(3).max(255).required(),
    estado: yup.string().min(2).max(40).required(),
    complemento: yup.string().min(3).max(255).nullable(),
    genero: yup.string().min(1).max(2).required(),
    dataNascimento: yup.string().min(6).max(10).required(),
  });
  let payload = req.body;
  try {
    req.body = await schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
    return next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ erros: error.errors });
    }
    return res.status(500).json({ error: "ops" });
  }
}

async function validar(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let id = Number(req.params.id);

  let usuario: Usuario | null = await Usuario.findOneBy({ id });

  if (!usuario) {
    return res.status(422).json({ error: "usuario nao encontrado" });
  }
  res.locals.usuario = usuario;

  return next();
}

async function validarSeEmailExiste(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let email: string = req.body.email;
  let id: number | undefined = req.params.id
    ? Number(req.params.id)
    : undefined;

  let usuario: Usuario | null = await Usuario.findOneBy({
    email,
    id: id ? Not(id) : undefined,
  }); //quando o id do editar for igual o id
  if (usuario) {
    return res.status(422).json({ error: "Email ja cadastrado" });
  }
  return next();
}

let rotas: Router = Router();
//listar
rotas.get("/usuarios", usuarioController.list);
//visualizar 1 usuario pelo id
rotas.get("/usuarios/:id", validar, usuarioController.find);
//criar
rotas.post(
  "/usuarios",
  validarPayload,
  validarSeEmailExiste,
  usuarioController.create
);
//atualizar
rotas.put(
  "/usuarios/:id",
  validar,
  validarPayload,
  validarSeEmailExiste,
  usuarioController.update
);
//delete
rotas.delete("/usuarios/:id", validar, usuarioController.delete);

rotas.get("/usuarioscsv", usuarioController.gerarCSVUsuarios);

export default rotas;
