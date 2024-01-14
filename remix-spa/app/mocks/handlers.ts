import { http, HttpResponse } from 'msw'
import type { User } from '../model/user'
import type { Todo } from '../model/todo'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Wick',
    } satisfies User)
  }),
  // return 400 error
  // http.get('/api/user', () => {
  //   return HttpResponse.json(null, {status: 400, statusText: 'Bad Request'})
  // })
  // return 200 in api/todo post
  http.post('/api/todo', () => {
    return HttpResponse.json({
      id: '1',
      title: 'new todo created',
      completed: false,
    } satisfies Todo)
  })
]