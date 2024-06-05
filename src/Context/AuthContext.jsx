
import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    async function SignUp(email, password, username, phone) {
        console.log('Signing up with', { email, password, username, phone });
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; 
      
        
        await updateProfile(user, { displayName: username });

       
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username: username,
            email: user.email,
            phone: phone,
        });

        setUser(user); 
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ SignUp, user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
