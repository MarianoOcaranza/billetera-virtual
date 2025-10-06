import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Root from "./pages/Root"
import Register from "./pages/Register"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
