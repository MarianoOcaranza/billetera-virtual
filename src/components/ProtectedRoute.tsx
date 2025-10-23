import React from 'react'
import { Navigate } from 'react-router'
import { useAuthStore } from '../stores/authStore'

interface Props {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLogged, loading } = useAuthStore()

  // Mientras se chequea el auth, no renderices nada (o muestra un loader)
  if (loading) return <div>Cargando...</div>

  if (!isLogged) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
