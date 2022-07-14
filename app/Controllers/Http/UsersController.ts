import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const userPayload = await request.validate(CreateUserValidator)
    const userResponse = await User.create(userPayload)
    return response.created({ userResponse })
  }

  public async update({ request, response }: HttpContextContract) {
    const { email, avatar, password } = request.only(['email', 'avatar', 'password'])
    const id = request.param('id')
    const user = await User.findOrFail(id)
    user.email = email
    user.password = password
    user.avatar = avatar

    await user.save()
    return response.ok({ message: 'atualizado com sucesso!' })
  }
}
