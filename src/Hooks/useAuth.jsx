import  { useContext } from 'react';
import { AuthContext } from '../Pages/Provider/AuthProvider';


const useAuth = () => {
    const auth = useContext(AuthContext)
    // console.log("from use auth",auth);
    return auth
    
};

export default useAuth;