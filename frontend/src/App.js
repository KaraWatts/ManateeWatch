import { useEffect, useState } from 'react'
import NavBar from './components/navBar'
import { Outlet, useLoaderData, useNavigate, useLocation } from 'react-router-dom'
import "./App.css"
import PopupAlert from './components/popupAlerts'

function App() {
  const [user, setUser] = useState(useLoaderData())
  const navigate = useNavigate()
  const location = useLocation()
  const [alert, setAlert] = useState(false)


  useEffect(() => {
    let nullUserUrls = ["/login/", "/signup/", "/", '/forgot-password/'] // should redirect to homepage if logged in

    // check if current url is one that might need to redirect
    let isAllowed = nullUserUrls.includes(location.pathname) || location.pathname.startsWith('/reset-password/');
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
      if (location.pathname.includes('/faq/') || location.pathname.includes('/getting-started/')){
        return;
      }
      navigate("/")
      setAlert(true)
    }

    console.log('user updated', user);
  }, [user, location.pathname, navigate])

  useEffect(() => {
    navigator.serviceWorker?.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }, []);


  return (
    <>
      <NavBar user={user} setUser={setUser} />
      {alert && <PopupAlert setAlert={setAlert} alert={alert} />}
      <Outlet context={{user, setUser}} />    
    </>
  )
}

export default App
