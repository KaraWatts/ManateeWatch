import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import SightingReport from './pages/SightingReport'
import { userConfirmation } from './components/utilities'
import SightingData from './pages/SightingLocation'

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        loader: userConfirmation,
        children:[
            {
                index:true,
                element:<HomePage/>,
            },
            {
                path:"/signup/",
                element:<SignUp/>
            },
            {
                path:"/login/",
                element: <LogIn/>
            },
            {
                path:"/sightingData/",
                element: <SightingData/>
            },
            {
              path:"/sighting/",
              element: <SightingReport/>
          }
        ]
    }
])

export default router;