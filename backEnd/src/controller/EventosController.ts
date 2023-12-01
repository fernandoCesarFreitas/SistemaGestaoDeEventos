import { Evento } from "../models/Eventos";
import { Request, Response } from "express";
export class EventosController {

  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let eventos: Evento[] = await Evento.find({
      where: { status: true },
    });
    return res.status(200).json(eventos);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela
    console.log(body);
    
    let evento: Evento = await Evento.create({
      nome: body.nome,
      dataInicio: body.dataInicio,
      dataFim: body.dataFim,
      hora: body.hora,
      local: body.local,
      status: true,
      descricao: body.descricao,
    }).save(); 


    return res.status(200).json(evento); //retorna o usuario criado e o status que deu certo
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let evento: Evento = res.locals.evento;
    evento.nome = body.nome;
    evento.dataInicio= body.dataInicio,
    evento.dataFim= body.dataFim,
    evento.hora = body.hora;
    evento.local = body.local;
    evento.descricao = body.descricao;
    evento.status = true;

    await evento.save();

    return res.status(200).json(evento);
  }



  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let evento: Evento = res.locals.evento;
    evento.status = false;
    await evento.save();
    return res.status(200).json(evento);
  }



  async find(req: Request, res: Response): Promise<Response> {
    let evento: Evento = res.locals.evento;
    return res.status(200).json(evento);
  }

  async gerarCSVEventos(req: Request, res: Response): Promise<void> {
    try {
      const eventos: Evento[] = await Evento.find(); // Substitua pelo método de busca apropriado

      if (eventos.length === 0) {
        res.status(404).json({ mensagem: "Nenhum evento encontrado." });
      }

      let csv = '"ID";"Nome";"Data de Início";"Data de Fim";"status"\n';

      for (const evento of eventos) {
        csv += `"${evento.id}";"${evento.nome}";"${evento.dataInicio}";"${evento.dataFim}";"${evento.status}"\n`;
      }

      // Envie o arquivo CSV como resposta
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=eventos.csv");
      res.status(200).send(csv);
    } catch (error) {
      console.error("Erro ao gerar o arquivo CSV de eventos:", error);
      res
        .status(500)
        .json({ mensagem: "Erro ao gerar o arquivo CSV de eventos." });
    }
  }
}

