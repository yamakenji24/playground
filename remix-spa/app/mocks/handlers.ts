import { http, HttpResponse } from 'msw'
import type { User } from '../model/user'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Wick',
    } satisfies User)
  })
  // return 400 error
  // http.get('/api/user', () => {
  //   return HttpResponse.json(null, {status: 400, statusText: 'Bad Request'})
  // })
]