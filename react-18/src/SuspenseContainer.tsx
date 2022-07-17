import React, { Suspense, useState, useCallback, useEffect } from "react";
import fetchGraphQL from "./fetchGraphQL";

export const SuspenseContainer = () => {
  return (
    <Suspense fallback={<p>fetching....</p>}>
      <GraphQLAPP />
    </Suspense>
  )
}

export const GraphQLAPP = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query RepositoryNameQuery {
        # feel free to change owner/name here
        repository(owner: "yamakenji24" name: "blog.yamakenji") {
          name
        }
      }
    `)
      .then((response) => {
        if (!isMounted) {
          return;
        }
        const data = response.data;
        setName(data.repository.name);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Render "Loading" until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <p>{name != null ? `Repository: ${name}` : "Loading"}</p>
      </header>
    </div>
  );
};
