"use client";
import { useState } from "react";
type Props = {
  catsFact: string[];
};
let count = 0;
export const CatFact = ({ catsFact }: Props) => {
  const [num, setNum] = useState(0);
  count += 1;

  return (
    <div>
      <p>Client Component: {count}</p>
      <button onClick={() => setNum((prev) => prev + 1)}>Click: {num}</button>
      {catsFact.map((fact, idx) => (
        <div key={idx}>{fact}</div>
      ))}
    </div>
  );
};
