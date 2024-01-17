import { Request } from 'express'
import { UserM } from '../model/user'

export interface IRequestWithUser extends Request {
  user: UserM
}
