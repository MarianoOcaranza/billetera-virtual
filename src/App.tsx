import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Root from "./pages/Root"
import Register from "./pages/Register"
import Recovery from "./pages/Recovery"
import Landing from "./pages/Landing"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path="/dashboard" element={<Root/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/recovery" element={<Recovery/>}/>
    </Routes>
  )
}

export default App
