import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
import { User } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async store ({ request, response, auth }: HttpContextContract) {
    // Valida dados de entrada
    const { email, password } = await request.validate(StoreValidator)

    // Busca usuário
    const user = await User.findByOrFail('email', email)

    // Verifica se o usuario verificou o email
    if (!user.hasEmailVerified) {
      return response.unauthorized({
        errors: {
          message: 'Email não verificado',
        },
      })
    }

    // Verifica se o usuario nao esta bloqueado
    if (!user.isActive) {
      return response.unauthorized({
        errors: {
          message: 'Usuário bloqueado',
        },
      })
    }

    // Remove tokens existentes
    await Database.query().from('api_tokens').where('user_id', user.id).delete()

    // Gera novo token
    const token = await auth.attempt(email, password, {
      expiresIn: '30 days',
    })

    // Retorna token
    return response.ok(token)
  }

  public async destroy ({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
