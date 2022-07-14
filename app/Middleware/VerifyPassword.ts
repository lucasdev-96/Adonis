import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'

export default class VerifyPassword {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const { password } = request.only(['password'])
    if (password.length < 6) {
      throw new BadRequestException('A senha deve ser maior ou igual que 6 caracteres')
    }
    await next()
  }
}
