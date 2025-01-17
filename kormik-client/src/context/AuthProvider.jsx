import { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { app, storage } from '../Firebase/firebase.config';
import useAxios from '../hooks/useAxios/useAxios';
import { ref, uploadBytes } from 'firebase/storage';

export const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
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
    const uploadFile = (file) =>{
        if (!file) {
            throw new Error("No file provided for upload.");
          }
        const storageRef = ref(storage, `files/${file.name}`)
        return uploadBytes(storageRef, file).catch((error) =>{
            console.error("Error uploading file", error)
            throw error;
        })
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
            if (currentUser) {
                try {
                    // Fetch user role if authenticated
                    const res = await axiosSecure.get(`/users?email=${currentUser.email}`);
                    currentUser.role = res?.data?.role;
                    setUser(currentUser);
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            } else {
                setUser(null); 
            }
            setLoading(false);
        })
        return () =>{
            unsubscribe()
        }
    },[axiosSecure])
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
        uploadFile
    }
    
    
    // setUser(myInitials)
    return (
        <AuthContext.Provider value={value}>
        {children}      
        </AuthContext.Provider>
    );
};

export default AuthProvider;