import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Firebase'

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('No hay Auth Provider');
    return context;
}

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Obtener el valor de 'showVideo' del almacenamiento local
    const showVideoFromLocalStorage = localStorage.getItem("showVideo");
    const [showVideo, setShowVideo] = useState(showVideoFromLocalStorage !== "false");

    // useEffect para actualizar 'showVideo' cuando el usuario se deslogue
    // useEffect(() => {
    //     if (!user) {
    //     // El usuario se ha deslogueado, actualiza 'showVideo' a true
    //     setShowVideo(true);
    //     }
    // }, [user]);

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = async (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => {
        // Antes de cerrar sesión, actualiza 'showVideo' en el localStorage a true
        localStorage.setItem("showVideo", "true");
        setShowVideo(true);
        signOut(auth);
    }
    const loginWithGoogle = () => {
        const GoogleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, GoogleProvider);
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
    }

    useEffect (() => {
        // console.log('auth provider loaded');
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuth(!!currentUser); // Actualiza el estado de autenticación
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Almacenar el valor actual de 'showVideo' en el localStorage
        localStorage.setItem("showVideo", showVideo.toString());
    }, [showVideo]);


    const value = {
        isAuth,
        setIsAuth,
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        showVideo, 
        setShowVideo
    };

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}