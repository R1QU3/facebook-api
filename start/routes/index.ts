import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'The application is already running' }
})

// Auth
Route.post('/auth', 'Auth/AuthController.store')
Route.delete('/auth', 'Auth/AuthController.destroy').middleware('auth')
