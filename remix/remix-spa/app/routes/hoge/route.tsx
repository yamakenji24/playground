import { useLoaderData, ClientActionFunctionArgs, Form, useActionData } from "@remix-run/react";
import { Todo } from "~/model/todo";
import { User } from "~/model/user";

export async function clientLoader() {
  const response = await fetch("/api/user");
  const data: User = await response.json();
  return data;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const body = await request.formData();
  console.log(body);
  console.log(body.get("todo"));

  // Post to /api/todo
  const response = await fetch("/api/todo", {
    method: "POST",
    body: JSON.stringify({
      todo: body.get("todo"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // return response
  const data: Todo = await response.json();

  return data;
}

export default function Index() {
  const user = useLoaderData<typeof clientLoader>();
  const newTodo = useActionData<typeof clientAction>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h2>Routes from hoge</h2>
      <User {...user} />
      {/**create a todo form */}
      <Form method="post">
        <input type="text" name="todo" />
        <button type="submit">Add Todo</button>
      </Form>
      {/**show the todo */}
      {newTodo && <p>{newTodo.title}</p>}
    </div>
  );
}

const User = ({firstName, lastName}: User) => {
  return (
    <div>
      <h2>User</h2>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  );
};
