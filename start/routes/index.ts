import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'The application is already running' }
})
