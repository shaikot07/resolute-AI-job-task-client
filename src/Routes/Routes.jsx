import {createBrowserRouter,} from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPages/ErrorPage";
import Signup from "../Pages/signUp/Signup";
import PrivateRoute from "./PrivateRoute";



export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<PrivateRoute><Home></Home></PrivateRoute>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
          path:'signup',
          element:<Signup></Signup>
        }
      ]
    },
  ]);  