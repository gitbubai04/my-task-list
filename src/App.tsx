import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './css/style.css'
import Loading from './components/Loading'
import { HomePage, Login, MyProfile, EmpView } from './pages'
import { UserData } from './Helper/Type';
import Layout from './components/Layout';
import { ToastService } from './Helper/Alert';

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    const storedAuthenticated = localStorage.getItem('authenticated');
    return storedAuthenticated === 'true';
  });

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  // const nav = useNavigate()

  const handelLogout = () => {
    setAuthenticated(false)
    const message = 'You are successfully logout';
    ToastService.success(message);
    localStorage.removeItem('userData')
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, [authenticated])

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated ? 'true' : 'false');
  }, [authenticated]);

  return (
    <BrowserRouter>
      <Routes>
        {authenticated ? (
          <>
            <Route
              path="/employees"
              element={
                <Suspense fallback={<Loading />}>
                  <Layout handelLogout={handelLogout} userName={userData?.fullName}>
                    <HomePage userData={userData} />
                  </Layout>
                </Suspense>
              }
            />
            <Route
              path="/employee/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <Layout handelLogout={handelLogout} userName={userData?.fullName}>
                    <EmpView />
                  </Layout>
                </Suspense>
              }
            />
            <Route
              path="/my-profile"
              element={
                <Suspense fallback={<Loading />}>
                  <Layout handelLogout={handelLogout} userName={userData?.fullName}>
                    <MyProfile userData={userData} />
                  </Layout>
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/employees" />} />
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