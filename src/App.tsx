import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './css/style.css'
import Loading from './components/Loading'
import { HomePage, Login } from './pages'

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    const storedAuthenticated = localStorage.getItem('authenticated');
    return storedAuthenticated === 'true';
  });

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated ? 'true' : 'false');
  }, [authenticated]);

  return (
    <BrowserRouter>
      <Routes>
        {authenticated ? (
          <>
            <Route
              path="/task"
              element={
                <Suspense fallback={<Loading />}>
                  <HomePage setAuthenticated={setAuthenticated} />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/task" />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loading />}>
                  <Login setAuthenticated={setAuthenticated} />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App