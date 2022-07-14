import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyEmail {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { email } = request.only(['email'])
    const regex = /\S+@\S+\.\S+/
    if (!regex.test(email)) {
      response.unprocessableEntity({ error: 'o email deve ser válido' })
      return
    }
    await next()
  }
}
