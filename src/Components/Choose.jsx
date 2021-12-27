import { Button } from '@mui/material'
import React from 'react'
import useAuth from '../hooks/useAuth';

const Choose = () => {
    const {logOut,user} = useAuth();
    console.log(user);
    return (
        <div>
            <p>{user.displayName}</p>
            <Button onClick={logOut} variant="contained">logout</Button>
        </div>
    )
}

export default Choose
