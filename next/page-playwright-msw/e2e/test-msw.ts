import { test, expect, http, HttpResponse } from "next/experimental/testmode/playwright/msw";

test.use({
  mswHandlers: [
    http.get('http://pizza.local.com/api/user', async () => {
      return HttpResponse.json({
        user: {
          username: 'dummy user',
          email: 'dummy email',
          bio: '',
        }
      })
    })
  ],
});

export { test, expect, http };