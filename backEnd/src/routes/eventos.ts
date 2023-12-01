import { Router, Request, Response, NextFunction } from "express";
import { Evento } from "../models/Eventos";
import * as yup from "yup";
import { Not } from "typeorm";
import { EventosController } from "../controller/EventosController";
let eventoController: EventosController = new EventosController();

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    dataInicio: yup.string().required(),
    hora: yup.string().min(11).max(11).required(),
    local: yup.string().min(8).max(15).required(),
    status: yup.boolean().required(),
    descricao: yup.string().min(1).max(2).required(),
  });
  let payload = req.body;
  console.log(payload);
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

  let evento: Evento | null = await Evento.findOneBy({ id });

  if (!evento) {
    return res.status(422).json({ error: "evento não encontrado" });
  }
  res.locals.evento = evento;

  return next();
}

// async function validarSeEmailExiste(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> {
//   let email: string = req.body.email;
//   let id: number | undefined = req.params.id
//     ? Number(req.params.id)
//     : undefined;

//   let usuario: Usuario | null = await Usuario.findOneBy({
//     email,
//     id: id ? Not(id) : undefined,
//   }); //quando o id do editar for igual o id
//   if (usuario) {
//     return res.status(422).json({ error: "Email ja cadastrado" });
//   }
//   return next();
// }

let rotas: Router = Router();
//listar
rotas.get("/eventos", eventoController.list);
//visualizar 1 usuario pelo id
rotas.get("/eventos/:id", validar, eventoController.find);
//criar
rotas.post(
  "/eventos",
  validarPayload,
  eventoController.create
);
//atualizar
rotas.put(
  "/eventos/:id",
  validar,
  validarPayload,
  eventoController.update
);
//delete
rotas.delete("/eventos/:id", validar, eventoController.delete);

rotas.get("/eventoscsv", eventoController.gerarCSVUsuarios);

export default rotas;
