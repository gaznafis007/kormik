import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import Loading from "../../Shared/Loading/Loading";


// eslint-disable-next-line react/prop-types
const PrivateRouter = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();
    if(loading){
        return (
            <Loading type="pulse" size="md" text="Loading..."/>
        )
    }
    if(!user?.uid){
        return <Navigate to={'/signin'} state={{from: location}} replace></Navigate>
    }
    return (
        children
    )
}
export default PrivateRouter;