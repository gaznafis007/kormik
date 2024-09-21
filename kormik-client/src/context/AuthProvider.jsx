import { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'

export const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const auth = getAuth()

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
            setLoading(false)
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
        register,
        logIn,
        getProfile,
        logOut

    }
    
    
    // setUser(myInitials)
    return (
        <AuthContext.Provider value={value}>
        {children}      
        </AuthContext.Provider>
    );
};

export default AuthProvider;