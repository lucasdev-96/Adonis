import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class VerifyEmail {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const { email } = request.only(['email'])
    const regex = /\S+@\S+\.\S+/
    if (!regex.test(email)) {
      throw new BadRequestException('o email deve ser válido')
    }
    await next()
  }
}
