import { UserM } from '../model/user'
import { RegisterUserType } from '../types/user.types'
export interface UserRepository {
  getUserByEmail(email: string): Promise<UserM>
  getExistsUser(email: string, username: string): Promise<UserM | null>
  insert(user: RegisterUserType): Promise<UserM>
  updateRefreshToken(id: number, refreshToken: string): Promise<void>
}
