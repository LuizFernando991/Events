export class UserWithoutPassword {
  id: number
  name: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
}

export class UserM extends UserWithoutPassword {
  password: string
  hashRefreshToken?: string
}
