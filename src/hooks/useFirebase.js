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
    const [currentUsr,setCurrentuser]= useState([]);
    const [manager,setManager] = useState(false);

    const currentUser = currentUsr[0];

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
                setAuthError('');
                const userInfo = users.find((currentUser) => currentUser.email == email);
               if(userInfo.role){
                history.replace('/dash');
               }
               else{
                history.replace('/choose');
               }
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
               
                setAuthError('');
                const userInfo = users.find((currentUser) => currentUser.email == user.email);
                if(userInfo.role){
                 history.replace('/dash');
                }
                else{
                 history.replace('/choose');
                }
                
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
      }, [user.email,authError])

      useEffect(() => {
        const url = `http://localhost:5000/user?email=${user.email}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setCurrentuser(data));
      }, [user.email,authError]);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => setManager(data.manager))
    }, [user.email])

    return {
        user,
        users,
        isLoading,
        admin,
        signInUsingGoogle,
        registerUser ,
        loginUser,
        authError,
        logOut,
        currentUser,
        manager
    }
}

export default useFirebase;