import { Injectable } from '@nestjs/common'
import { IHashService } from 'src/domain/adapters/hash.interface'
import * as argon from 'argon2'

@Injectable()
export class HashService implements IHashService {
  async hash(hashString: string): Promise<string> {
    return await argon.hash(hashString)
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await argon.verify(hashPassword, password)
  }
}
