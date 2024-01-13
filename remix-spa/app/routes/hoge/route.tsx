import useSWR from "swr";
import { User } from "~/model/user";

export default function Index() {
  const { data: user, error } = useSWR<User, Error>("/api/user", fetcher, {suspense: true});
  console.log(user, error);

  // Suspenseでundefinedではないはずだが、型推論的に
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h2>Routes from hoge</h2>
      <User {...user}/>
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

const fetcher = async (url: string) => {
  const res = await fetch(url)
 
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }
 
  return res.json()
}
