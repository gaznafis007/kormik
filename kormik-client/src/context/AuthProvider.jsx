import { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { app } from '../Firebase/firebase.config';
import useAxios from '../hooks/useAxios/useAxios';

export const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxios()
    const auth = getAuth(app)

    const register = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const getProfile = displayName =>{
        return updateProfile(auth.currentUser, {displayName})
    }
    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            if(currentUser?.uid){
                axiosSecure.get(`/users?email=${currentUser.email}`)
            .then(res=>{
                currentUser.role = res?.data?.role
                setUser(currentUser);
                setLoading(false)
                // test purpose

                // console.log(res.data)
                // console.log(currentUser)
            })
            }
        })
        return () =>{
            unsubscribe()
        }
    },[])
    // test for context=api
    const myInitials = {
        name: 'testUser',
        email: 'test@mail.com'
    }
    const value = {
        myInitials,
        user,
        loading,
        setLoading,
        register,
        logIn,
        getProfile,
        logOut, 
    }
    
    
    // setUser(myInitials)
    return (
        <AuthContext.Provider value={value}>
        {children}      
        </AuthContext.Provider>
    );
};

export default AuthProvider;