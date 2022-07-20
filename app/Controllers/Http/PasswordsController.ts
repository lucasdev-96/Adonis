import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PasswordsController {
    public async forgotPassword({ request, response }: HttpContextContract) {
        const { email } = request.only(['email'])
        await Mail.send((message) => {
            message
            .from('roleplay@roleplay.com')
            .to(email)
            .subject('Recuperação de senha')
            .text('Clique no link abaixo para recuperar sua senha')
        })
        response.noContent()
      }

}
