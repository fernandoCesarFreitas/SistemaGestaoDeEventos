import *  as nodemailer from 'nodemailer';
import { Usuario } from '../models/Usuario';
import { Request, Response } from 'express';
4

export class EmailController {

   
     async  enviarEmail(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const cliente: Usuario = res.locals.clientes;
            const email = cliente.email;
            const titulo = body.titulo;
            const mensagem = body.mensagem;
    
            // Configurações do Mailtrap
            const mailtrapConfig = {
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "5a2e838c92cce5",
                  pass: "********1891"
                }
            };
    
            // Opções do e-mail
            const mailOptions = {
                from: '"Gestor de eventos" <eventoscrie.ti@gmail.com>',
                to: email,
                subject: titulo,
                html: mensagem,
            };
    
            // Criação do transporte Nodemailer
            const transporter = nodemailer.createTransport(mailtrapConfig);
    
            // Envio do e-mail
            await transporter.sendMail(mailOptions);
    
            return res.status(200).json({ mensagem: 'Email enviado' });
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).json({ erro: 'Erro ao enviar e-mail' });
        }
    }
    



    async emailAutomaticco(aux: Usuario, titulo: string, mensagem: string) {

        let cliente: Usuario = aux;
        let email = cliente.email;

        let emailConfig = {
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            tls: {
                rejectUnauthorized: false,
                ciphers: 'SSLv3',
            },
            auth: {
                user: 'fernandochfreitas05071988@outlook.com',//oficina.crieti@hotmail.com
                pass: 'ipjnqq3rr#',//jucabala123
            },
        }

        let mailOptions = {
            from: 'fernandochfreitas05071988@outlook.com',//oficina.crieti@hotmail.com
            to: email,
            subject: titulo,
            html: mensagem,
        };

        let tranporter = nodemailer.createTransport(emailConfig);

        tranporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Erro ao enviar email: ' + error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }

}