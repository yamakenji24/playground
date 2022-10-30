import type { ReactNode } from 'react';

let count = 0

export default function Layout({ children }: { children: ReactNode }) {
  count += 1;
  return (
    <div className="flex">
      <div className="bg-teal-500">
        <p>This is Cat layout: {count}</p>
      </div>
      {children}
    </div>
  )
}