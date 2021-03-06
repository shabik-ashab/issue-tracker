import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken, signOut } from "firebase/auth";

import { useState, useEffect } from 'react';
import initializeAuthentication from '../Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    const [currentUsr,setCurrentuser]= useState([]);

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
                // const userInfo = users.find((currentUser) => currentUser.email == email);
               if(currentUsr.role){
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
                // const userInfo = users.find((currentUser) => currentUser.email == user.email);
                if(currentUsr.role){
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
        fetch('https://sleepy-lowlands-62924.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    // useEffect(() => {
    //     fetch('https://sleepy-lowlands-62924.herokuapp.com/users') 
    //     .then((res) => res.json())
    //       .then((data) => {
    //         setUsers(data);
    //       });
    //   }, [user.email,authError])

      useEffect(() => {
        const url = `https://sleepy-lowlands-62924.herokuapp.com/user?email=${user.email}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setCurrentuser(data));
      }, [user.email,authError]);

    // useEffect(() => {
    //     fetch(`https://sleepy-lowlands-62924.herokuapp.com/users/${user.email}`)
    //         .then(res => res.json())
    //         .then(data => setManager(data.manager))
    // }, [user.email])

    return {
        user,
        isLoading,
        signInUsingGoogle,
        registerUser ,
        loginUser,
        authError,
        logOut,
        currentUser
    }
}

export default useFirebase;