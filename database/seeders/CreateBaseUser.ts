import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      name: 'Teste',
      username: 'teste123',
      email: 'teste@example.com',
      password: '123456',
      hasEmailVerified: true,
    })
  }
}
