import { Global, Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({}),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          secure: true,
          auth: {
            user: config.get('SMTP_MAIL'),
            pass: config.get('SMTP_PASSWORD')
          }
        },
        defaults: {
          from: 'ProgramaJunior'
        },
        template: {
          dir: join(__dirname, '../../../../email-template'),
          adapter: new EjsAdapter(),
          options: {
            strict: false
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
