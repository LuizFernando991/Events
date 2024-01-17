export type mailOptions = {
  subject: string
  email: string
  name: string
  activationCode: string
  template: string
}

export interface IEmailsender {
  sendMail(emailData: mailOptions): Promise<void>
}
