import {createBrowserRouter,} from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPages/ErrorPage";



export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
            path:'login',
            element:<Login></Login>
        },
      ]
    },
  ]);  