import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailProvider, IMessage } from "../IMailProvider";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '20cf798824d019',
        pass: '5c61238bb882d6'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body
    })
  }
}