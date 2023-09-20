import { useNavigate } from 'react-router-dom'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { UserData } from '../../../Helper/Type';

function Home(props: any) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const nav = useNavigate()
  const click = () => {
    props.setAuthenticated(false)
    localStorage.removeItem('userData')
    nav('/login')
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, [])

  return (
    <Layout>
      {userData ? (
        <>
          <p>Name: {userData.fullName}</p>
          <p>Email: {userData.email}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={click}>Home</button>
    </Layout>
  )
}

export default Home