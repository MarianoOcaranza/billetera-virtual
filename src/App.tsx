import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/Login"
import Root from "./pages/Root"
import Register from "./pages/Register"
import Recovery from "./pages/Recovery"
import Deposit from "./pages/Deposit"
import Transfer from "./pages/Transfer"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuthStore } from "./stores/authStore"
import { useEffect } from "react"
import Profile from "./pages/Profile"
import Movements from "./pages/Movements"

function App() {
  const { checkAuth, checked, isLogged } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (!checked) {
    return <p>cargando...</p>
  }

  return (
    <Routes>
      <Route path='/' element={isLogged ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      } />
      <Route path="/ingresar" element={
        <ProtectedRoute>
          <Deposit />
        </ProtectedRoute>
      } />
      <Route path="/transferir" element={
        <ProtectedRoute>
          <Transfer />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/movimientos" element={
        <ProtectedRoute>
          <Movements />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/recovery" element={<Recovery/>}/>
    </Routes>
  )
}

export default App
