import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react';
import reactLogo from './assets/react.svg'
import './App.css'
import { invoke } from "@tauri-apps/api"; 

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const handleOnClick = async () => {
    const response = await invoke("greet", {name: message})
    alert(response);
    setMessage("");
    if (inputRef === null) return;
    inputRef.current.value = ''
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
      <div>
        <p>Message: {message}</p>
        <input ref={inputRef} type="text" onChange={handleMessage} />
        <button onClick={handleOnClick}> CLick me</button>
      </div>
    </div>
  )
}

export default App
