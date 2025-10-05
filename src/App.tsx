import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Root from "./pages/Root"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App
