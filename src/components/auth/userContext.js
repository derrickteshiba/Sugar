import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth,onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    updateProfile, signInWithEmailAndPassword, signOut,
    sendPasswordResetEmail}
    from 'firebase/auth';
import {auth} from "../../firebase"

const UserContext = createContext({})

export function useUserContext()
{
    return useContext(UserContext)
}

export function UserContextProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] =useState(true)

    function signup(email, password)
    {
        return createUserWithEmailAndPassword(auth, email,password)
    }
    
    function login(email, password)
    {
        return signInWithEmailAndPassword(auth, email,password)
    }

    function logout() {
       return signOut(auth)
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth,email)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    
    const value = {
        currentUser,
        signup,
        logout,
        login,
        forgotPassword,
    }
    return (
    <UserContext.Provider value={value}>
        {!loading && children}
    </UserContext.Provider>
    )
}

