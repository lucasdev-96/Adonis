import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const userPayload = request.only(['username', 'password', 'email', 'avatar'])
    let userResponse = await User.create(userPayload)
    return response.created({ userResponse })
  }
}
