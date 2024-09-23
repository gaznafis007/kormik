import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";


const useAuth = () => {
    const authResponse = useContext(AuthContext)
    return authResponse;
};

export default useAuth;