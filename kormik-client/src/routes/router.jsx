import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main/Main"
import Home from "../Pages/Home/Home"
import Signup from "../Pages/Signup/Signup"
import Signin from "../Pages/Signin/Signin"
import PostJob from "../Pages/PostJob/PostJob"
import PrivateRouter from "../Pages/Private/PrivateRouter"
import Jobs from "../Pages/Jobs/Jobs"
import Job from "../Pages/Job/Job"



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/register",
                element:<Signup/>
            },
            {
                path:"/signin",
                element:<Signin/>
            },
            {
                path:"/postJob",
                element: <PrivateRouter><PostJob/></PrivateRouter>
            },
            {
                path:"/jobs",
                element: <Jobs/>
            },
            {
                path:"/jobs/:id",
                element: <Job/>
            }
        ]
    }
])