import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyPassword {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { password } = request.only(['password'])
    if (password.length < 6) {
      response.unprocessableEntity({ error: 'A senha deve ser maior ou igual que 6 caracteres' })
      return
    }
    await next()
  }
}
