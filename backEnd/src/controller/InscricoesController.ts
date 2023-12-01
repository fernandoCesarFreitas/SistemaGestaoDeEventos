//controla de inscricoes de eventos
import { Inscricoes } from "../models/Inscricoes";
import { Usuario } from "../models/Usuario";
import { Evento } from "../models/Eventos";
import { Request, Response } from "express";
export class InscricoesController {

  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let inscricoes: Inscricoes[] = await Inscricoes.find({
      where: { status: true },
    });
    return res.status(200).json(inscricoes);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela
    console.log(body);

    let usuarioId = body.usuarioId;
    let eventoId = body.eventoId;

    let usuario = await Usuario.findOneBy({ id: usuarioId });
    let evento = await Evento.findOneBy({ id: eventoId });

    if (!usuario) {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }

    if (!evento) {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }

    let inscricoes: Inscricoes = await Inscricoes.create({
      usuarios: usuario,
      eventos: evento,
      status: true,
      checkin: false,
    }).save();

    return res.status(200).json(inscricoes);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let inscricoes: Inscricoes = res.locals.inscricoes;


    if (!inscricoes) {
        return res.status(400).json({ mensagem: "Inscricão não encontrada" });
      }

    let usuarioId = body.usuarioId;
    let eventoId = body.eventoId;

    let usuario = await Usuario.findOneBy({ id: usuarioId });
    let evento = await Evento.findOneBy({ id: eventoId });

    if (!usuario) {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }
    if (!evento) {
      return res.status(400).json({ mensagem: "Evento não encontrado" });
    }
    inscricoes.usuarios = usuario;
    inscricoes.eventos = evento;
    inscricoes.status = true;
    inscricoes.checkin = false;

    await inscricoes.save();

    return res.status(200).json(inscricoes);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let inscricoes: Inscricoes = res.locals.inscricoes;
    inscricoes.status = false;
    await inscricoes.save();
    return res.status(200).json(inscricoes);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let inscricoes: Inscricoes = res.locals.inscricoes;
    return res.status(200).json(inscricoes);
  }

  async gerarCSVInscricoes(req: Request, res: Response): Promise<void> {
    try {
      const inscricoes: Inscricoes[] = await Inscricoes.find(); // Substitua pelo método de busca apropriado

      if (inscricoes.length === 0) {
        res.status(404).json({ mensagem: "Nenhum evento encontrado." });
      }

      let csv = '"ID";"Status";"check-in";"Evento";"Usuario"\n';

      for (const inscricao of inscricoes) {
        csv += `"${inscricao.id}";"${inscricao.status}";"${inscricao.checkin}";"${inscricao.eventos.nome}";"${inscricao.usuarios.nome}"\n`;
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
