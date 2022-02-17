import { Button } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const AssignTicketDetails = ({handleGoBack}) => {
    const { id } = useParams();
  return (
    <>
    AssignTicketDetails:{id}
    <Button onClick={handleGoBack} >Go Back </Button>
    </>
  )
}

export default AssignTicketDetails