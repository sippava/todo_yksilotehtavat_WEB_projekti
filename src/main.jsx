// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Authentication, {
  AuthenticationMode
} from './screens/Authentication.jsx'
import NotFound from './screens/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UserProvider from './context/UserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <Authentication
                authenticationMode={AuthenticationMode.SignIn}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Authentication
                authenticationMode={AuthenticationMode.SignUp}
              />
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)