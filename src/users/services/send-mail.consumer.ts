import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ISendProductsMail } from './send-mail.producer';
import { MailerService } from '@nestjs-modules/mailer';
import { UserCatalogGenerate } from './user-catalog-generate';

@Processor('sendmail-queue')
export class SendMailConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process('sendmail-job')
  async generateReport(job: Job<ISendProductsMail>) {
    console.log(`Iniciando processamento de SendMail`);
    const initialDate = new Date();
    const { data } = job;
    await this.mailerService.sendMail({
      to: data.email,
      from: '"User Catalog" <user.catalog@example.com>',
      subject: `User-Catalog: Nosso catalogo já está disponivel para você!`,
      html: `<h1>Olá</h1> <h3>${data.fullName},</h3> Estamos te enviando o nosso catalogo para que você escolha nossos produtos. <br> Att, User-Catalog`,
      attachments: [
        {
          filename: 'user-catalog.csv',
          content: UserCatalogGenerate.gen(),
        },
      ],
    });
    const diff: number = new Date().getTime() - initialDate.getTime();
    console.log(`SendMail Geração e Envio: ${diff} ms.`);
  }
}
