import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  return { user };
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  if (!user) {
    return (
      <div>
        <p> Hi Guest</p>
        <p>Please Login</p>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <p>{user.username}</p>
    </div>
  );
}
