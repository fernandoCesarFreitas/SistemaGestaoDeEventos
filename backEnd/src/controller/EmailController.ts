// import *  as nodemailer from 'nodemailer';
// import { Usuario } from '../models/Usuario';
// import { Request, Response } from 'express';
// 4

// export class EmailController {

//     async enviarEmail(req: Request, res: Response): Promise<Response> {
//         let body = req.body;

//         let cliente: Usuario = res.locals.clientes;
//         let email = cliente.email;
//         let titulo = body.titulo;
//         let mensagem = body.mensagem;
//         console.log(email, titulo, mensagem)

//         let emailConfig = {
//             host: "smtp.office365.com",
//             port: 587,
//             secure: false,
//             tls: {
//                 rejectUnauthorized: false,
//                 ciphers: 'SSLv3',
//             },
//             auth: {
//                 user: 'oficina.crieti@hotmail.com',
//                 pass: 'jucabala123',
//             },
//         }

//         let mailOptions = {
//             from: 'oficina.crieti@hotmail.com',
//             to: email,
//             subject: titulo,
//             html: mensagem,
//         };

//         let transporter = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//               user: "5a2e838c92cce5",
//               pass: "********1891"
//             }
//           });

//           await transporter.sendMail({
//             from: '"Gestor de eventos" <eventoscrie.ti@gmail.com>',
//             to: `${cliente.nome}` < `${}`>,
//             subject: "Sua inscrição foi realizada!",
//             text: "Sua inscrição para o evento: " + evento.nome + " foi realizada com sucesso!"
//           });
//         return res.status(200).json({ mensagem: 'Email enviado' });
//     }



//     async emailAutomaticco(aux: Clientes, titulo: string, mensagem: string) {

//         let cliente: Clientes = aux;
//         let email = cliente.email;

//         let emailConfig = {
//             host: "smtp.office365.com",
//             port: 587,
//             secure: false,
//             tls: {
//                 rejectUnauthorized: false,
//                 ciphers: 'SSLv3',
//             },
//             auth: {
//                 user: 'fernandochfreitas05071988@outlook.com',//oficina.crieti@hotmail.com
//                 pass: 'ipjnqq3rr#',//jucabala123
//             },
//         }

//         let mailOptions = {
//             from: 'fernandochfreitas05071988@outlook.com',//oficina.crieti@hotmail.com
//             to: email,
//             subject: titulo,
//             html: mensagem,
//         };

//         let tranporter = nodemailer.createTransport(emailConfig);

//         tranporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log('Erro ao enviar email: ' + error);
//             } else {
//                 console.log('Email enviado: ' + info.response);
//             }
//         });
//     }

// }