import React from 'react';
import wave from '../images/wave.svg'
import useAuth from '../hooks/useAuth';
import { Typography } from '@mui/material';

const Header = () => {
    const {user} = useAuth();
    return (
        <div className='header'>
            <div className='header-img'>
            <img  src={wave} />
            </div>
           
        </div>
    )
}

export default Header
