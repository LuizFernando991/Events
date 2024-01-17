import { UserM } from '../model/user'
import { RegisterUserType } from '../types/user.types'
export interface UserRepository {
  getUserByEmail(email: string): Promise<UserM>
  insert(user: RegisterUserType): Promise<UserM>
}
