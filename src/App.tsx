//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import DrawerMenu from './components/DrawerMenu';
import { useState } from 'react';
import TaskApp from './tasks';
import QuizApp from './quiz';
import InventoryApp from './inventory/App';
import StockApp from './stock/app/App';
import LMSApp from './lms/App';

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
        <Route path="/quiz/*" element={<QuizApp />} />
        <Route path="/inventory/*" element={<InventoryApp />} />
        <Route path="/stock/*" element={<StockApp />} />
        <Route path="/lms/*" element={<LMSApp />} />
        
      </Routes>
    </div>
  )
}

export default App
