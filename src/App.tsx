//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import DrawerMenu from './components/DrawerMenu';
import { useState } from 'react';
import TaskApp from './tasks';
import QuizApp from './quizApp';

function Demo({ body }: { body: string }) {
  const [count, setCount] = useState(0)
  return <>
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR {body}
      </p>
    </div>
    <p className="read-the-docs">
      Click on the Vite and React logos to learn more
    </p>
  </>
}

function App() {
  return (
    <div>
      <DrawerMenu />
      <Routes>
        <Route path="/" element={<Demo body="A" />} />
        <Route path="/tasks/*" element={<TaskApp />} />
        <Route path="/contact" element={<QuizApp />} />
      </Routes>
    </div>
  )
}

export default App
