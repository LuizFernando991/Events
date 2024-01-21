import { UserM } from '../model/user'
import { RegisterUserType, SearchUserResType } from '../types/user.types'
export interface UserRepository {
  getUserByEmail(email: string): Promise<UserM>
  getUserById(id: number): Promise<UserM>
  getExistsUser(email: string, username: string): Promise<UserM | null>
  insert(user: RegisterUserType): Promise<UserM>
  updateRefreshToken(id: number, refreshToken: string): Promise<void>
  getSearchUsers(id: number): Promise<SearchUserResType[]>
}
