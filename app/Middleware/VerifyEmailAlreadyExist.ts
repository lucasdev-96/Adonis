import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

export default class VerifyEmailAlreadyExist {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const user = await User.findBy('email', request.body().email)
    if (user) {
      throw new BadRequestException('email já cadastrado')
    }
    await next()
  }
}
