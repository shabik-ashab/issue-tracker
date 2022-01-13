import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken, signOut } from "firebase/auth";

import { useState, useEffect } from 'react';
import initializeAuthentication from '../Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [authError, setAuthError] = useState('');
    const [users,setUsers]  = useState([]);

    const auth = getAuth();

    
    const registerUser = (email, password, name,history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password,history)
            .then((userCredential) => {
                
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                // save user to the database
                saveUser(email, name, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false),
            history.replace('/choose')
            );
    }

    const loginUser = (email, password,history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password,history)
            .then((userCredential) => {
                history.replace('/choose');
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }
    const googleProvider = new GoogleAuthProvider();
    
    const signInUsingGoogle =(history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');
                history.replace('/choose');
                setAuthError('');
                
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
           
    }
    // observe user state change
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])

    const logOut = (history) => {
        setIsLoading(true);
        console.log(user.displayName);
        signOut(auth)
            .then(() => {
                history.replace('/');
             })
            .finally(() => setIsLoading(false));
    }
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    useEffect(() => {
        fetch('http://localhost:5000/users') 
        .then((res) => res.json())
          .then((data) => {
            setUsers(data);
          });
      }, [user.email])

    // useEffect(() => {
    //     fetch(`https://hidden-mountain-15974.herokuapp.com/users/${user.email}`)
    //         .then(res => res.json())
    //         .then(data => setAdmin(data.admin))
    // }, [user.email])

    return {
        user,
        users,
        isLoading,
        admin,
        signInUsingGoogle,
        registerUser ,
        loginUser,
        authError,
        logOut
    }
}

export default useFirebase;