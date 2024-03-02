import { CatFact } from "./CatFact";

async function getCatFact() {
  const res = await fetch('https://meowfacts.herokuapp.com/\?count\=3')
  return res.json();
}

export default async function Page() {
  const catsFact = await getCatFact()
  return (
    <div className="bg-lime-200">
      <h1>Page Cat</h1>
      <CatFact catsFact={catsFact.data}/>
    </div>
  )
}