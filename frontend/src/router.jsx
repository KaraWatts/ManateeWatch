import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import HomePage from './components/HomePage'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import { userConfirmation } from './components/utilities'

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
            }
        ]
    }
])

export default router;