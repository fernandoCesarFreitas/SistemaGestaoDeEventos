import { Inscricoes } from '../models/Inscricoes';
import { Router, Request, Response, NextFunction } from "express";
import { InscricoesController } from "../controller/InscricoesController";
import * as yup from "yup";
import { Not } from "typeorm";
let inscricoesController: InscricoesController = new InscricoesController();

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    status: yup.boolean().required(),
    checkin: yup.boolean().required(),
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

  let inscricoes: Inscricoes | null = await Inscricoes.findOneBy({ id });

  if (!inscricoes) {
    return res.status(422).json({ error: "inscrição não encontrada" });
  }
  res.locals.inscricoes = inscricoes;

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
rotas.get("/inscricoes", inscricoesController.list);
//visualizar 1 usuario pelo id
rotas.get("/inscricoes/:id", validar, inscricoesController.find);
//criar
rotas.post(
  "/inscricoes",
  validarPayload,
  inscricoesController.create
);
//atualizar
rotas.put(
  "/inscricoes/:id",
  validar,
  validarPayload,
  inscricoesController.update
);
//delete
rotas.delete("/inscricoes/:id", validar, inscricoesController.delete);

rotas.get("/inscricoescsv", inscricoesController.gerarCSVInscricoes);

export default rotas;
