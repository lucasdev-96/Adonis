import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class VerifyEmailAlreadyExist {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const user = await User.findBy('email', request.body().email)
    console.log(user)
    if (user) {
      response.unprocessableEntity({ error: 'Email já cadastrado' })
      return
    }
    await next()
  }
}
