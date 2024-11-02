import { useState } from 'react'
import { Button } from './components/ui/button'
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Toaster />
        <Button variant="ghost" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
       
    </>
  )
}

export default App
