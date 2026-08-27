import { Navigate } from 'react-router-dom'
import { useUser } from '../context/useUser'

export default function ProtectedRoute({ children }) {
  const { user } = useUser()

  if (!user?.token) {
    return <Navigate to="/signin" replace />
  }

  return children
}