import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import Loading from "../../Shared/Loading/Loading";


// eslint-disable-next-line react/prop-types
const PrivateRouter = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()
    if(user?.uid){
        return children
    }
    if(loading){
        return (
            <Loading type="spinner" size="md" text="Loading..."/>
        )
    }
    return (
        <Navigate to={'/signin'} state={{from: location}} replace></Navigate>
    )
}
export default PrivateRouter;