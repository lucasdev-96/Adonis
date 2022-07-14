import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class VerifyUsernameAlreadyExist {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const user = await User.findBy('username', request.body().username)
    if (user) {
      throw new BadRequestException('username já cadastrado')
    }
    await next()
  }
}
