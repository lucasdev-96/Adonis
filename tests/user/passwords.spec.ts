import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Password', (group) => {
  test('it should send email with forgot password instructions', async ({ client, assert }) => {
    const user = await UserFactory.create();

    const email = Mail.fake()
    assert.isTrue(email.exists((message) => message.subject === 'Nota do seu bimestre'))
    // assert.isTrue(email.exists((message) => message.text === 'Olá voce tirou 0'))
    // const subject = email.find((message) => message.subject === 'Recuperação de senha')
    // assert.equal(subject, 'Recuperação de senha1')

    
    const response =  client.post('/forgot-password').json({
        email: user.email,
        resetPassword: user.avatar
    });
    (await response).assertStatus(204);
    // (await response).assertBody({
    //     email: user.email,
    //     resetPassword: user.avatar
    //   })
      Mail.restore()

  })

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
})
