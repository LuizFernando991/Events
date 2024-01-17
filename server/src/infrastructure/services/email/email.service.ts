import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import {
  IEmailsender,
  mailOptions
} from 'src/domain/adapters/emailsender.interface'

@Injectable()
export class EmailService implements IEmailsender {
  constructor(private mailService: MailerService) {}
  async sendMail({
    subject,
    email,
    name,
    activationCode,
    template
  }: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        activationCode
      }
    })
  }
}
