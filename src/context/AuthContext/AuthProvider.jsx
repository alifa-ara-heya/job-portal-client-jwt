import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const singInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('state captured, current user', currentUser);

            if (currentUser?.email) {
                const user = { email: currentUser.email }

                axios.post('https://job-portal-server-for-recruiter-part3-swart.vercel.app/jwt', user, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('login token', res.data)
                        setLoading(false);
                    })
                //make sure to see "login token, success:true" and the token in application tab
            }

            // when the user logs out, the currentUser becomes null
            else {
                axios.post('https://job-portal-server-for-recruiter-part3-swart.vercel.app/logout', {}, {
                    withCredentials: true,
                })
                    .then(res => {
                        console.log('logout', res.data)
                        setLoading(false);
                    })
                //make sure to see "logout, success:true" and no token in application tab
            }

        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        singInUser,
        singInWithGoogle,
        signOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;