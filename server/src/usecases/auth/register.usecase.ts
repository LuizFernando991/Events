import { IEmailsender } from 'src/domain/adapters/emailsender.interface'
import { IHashService } from 'src/domain/adapters/hash.interface'
import { IJwtService } from 'src/domain/adapters/jwt.interface'
import { EnviromentConfig } from 'src/domain/config/enviroment.interface'
import { UserWithoutPassword } from 'src/domain/model/user'
import { UserRepository } from 'src/domain/repositories/userRepositoryIInterface'
import { RegisterUserType } from 'src/domain/types/user.types'
import { removeObjectKey } from 'src/helpers/removeKey.helper'

export class RegisterUseCases {
  constructor(
    private readonly jwtTokenService: IJwtService,
    private readonly enviromentConfig: EnviromentConfig,
    private readonly userRepository: UserRepository,
    private readonly emailSender: IEmailsender,
    private readonly hashService: IHashService
  ) {}

  private async createActivationToken(user: RegisterUserType) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const secret = this.enviromentConfig.getJwtSecret()
    const expiresIn = this.enviromentConfig.getJwtExpirationTime()
    const payload = {
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
      },
      code: activationCode
    }
    const token = this.jwtTokenService.createActivationToken(
      payload,
      secret,
      expiresIn
    )

    return { token, activationCode }
  }

  async register(user: RegisterUserType) {
    const existsUser = await this.userRepository.getUserByEmail(user.email)

    if (!!existsUser) {
      return null //throw new error
    }

    const hashPassword = await this.hashService.hash(user.password)

    const { token: activationToken, activationCode } =
      await this.createActivationToken({
        ...user,
        password: hashPassword
      })

    this.emailSender.sendMail({
      subject: 'Ative sua conta!',
      email: user.email,
      template: './register-template.ejs',
      name: user.name,
      activationCode
    })

    return { activationToken }
  }

  async saveUser(activationToken: string, code: string) {
    const secret = this.enviromentConfig.getJwtSecret()
    const payload = await this.jwtTokenService.checkActiovationToken(
      activationToken,
      secret
    )

    if (!payload || code !== payload.code) {
      return null //throw new error (bad request)
    }

    const newUser = await this.userRepository.insert(payload.user)

    const safeUser: UserWithoutPassword = removeObjectKey(newUser, 'password')

    return { user: safeUser }
  }
}
