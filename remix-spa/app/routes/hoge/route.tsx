import { useLoaderData } from "@remix-run/react";
import { User } from "~/model/user";

export async function clientLoader() {
  const response = await fetch("/api/user");
  const data: User = await response.json();
  return data;
}

export default function Index() {
  const user = useLoaderData<typeof clientLoader>();
  console.log(user)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h2>Routes from hoge</h2>
      <User {...user} />
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
