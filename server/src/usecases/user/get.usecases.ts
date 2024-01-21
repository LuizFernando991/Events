import { UserRepository } from 'src/domain/repositories/userRepositoryInterface'

export class GetUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async searchUsers(userId: number) {
    const users = await this.userRepository.getSearchUsers(userId)
    return users
  }
}
