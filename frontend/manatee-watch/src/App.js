import { useEffect, useState } from 'react'
import NavBar from './components/navBar'
import { Outlet, useLoaderData, useNavigate, useLocation } from 'react-router-dom'
import "./App.css"

function App() {
  const [user, setUser] = useState(useLoaderData())
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    let nullUserUrls = ["/login/", "/signup/", "/"] // should redirect to homepage if logged in

    // check if current url is one that might need to redirect
    let isAllowed = nullUserUrls.includes(location.pathname)
    console.log('isallowed ', isAllowed)

    // redirect to homepage when
    // logged user tries to go to signup, etc
    if(user && isAllowed) {
      console.log('redirect to homepage')
      navigate("/")
    }

    // not logged in user tries to go anywhere BUT signup or login
    // we redirect because the user needs to log in before they do anything else
    else if (!user && !isAllowed){
      navigate("/signup/")
    }

    console.log('user updated', user);
  }, [user, location.pathname])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Outlet context={{user, setUser}} />
    </>
  )
}

export default App
