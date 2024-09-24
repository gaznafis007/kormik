import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";


// eslint-disable-next-line react/prop-types
const PrivateRouter = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()
    if(user?.uid){
        return children
    }
    if(loading){
        return (
            <h2 className="text-rose-500 text-center text-3xl animate-pulse">Loading..</h2>
        )
    }
    return (
        <Navigate to={'/signin'} state={{from: location}} replace></Navigate>
    )
}
export default PrivateRouter;