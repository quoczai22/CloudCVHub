import './App.css'
import LoginPage from './pages/Login.jsx'
import FigmaApp from './figma-mockup/App.tsx'
import { useState, useEffect } from 'react'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"))

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"))
    }
    window.addEventListener("storage", handleStorageChange)
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token")
      if (currentToken !== token) {
        setToken(currentToken)
      }
    }, 600)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [token])

  if (!token) {
    return (
      <LoginPage
        onLoginSuccess={(tok) => {
          setToken(tok)
        }}
      />
    )
  }

  return <FigmaApp />
}

export default App

