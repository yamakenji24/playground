import Link from 'next/link';
import type { ReactNode } from 'react';
import "../styles/globals.css"
let count = 0;
export default function RootLayout({ children }: { children: ReactNode }) {
  count += 1;

  return (
    <html lang="en">
      <head>
        <title>Random Cat fact</title>
      </head>
      <body>
        <Header />
        <p>count: {count}</p>
        {children}
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <div className="bg-red-500">
      <h2>Red is Root Layout</h2>
      <div className='flex'>
        <Link className="px-2" href="/cat">Cat</Link>
        <Link className="px-2" href="/dog">Dog</Link>
      </div>
    </div>
  )
}