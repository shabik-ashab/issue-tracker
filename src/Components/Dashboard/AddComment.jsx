import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'

const AddComment = ({user,id}) => {
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    const initialInfo = { name: user.displayName, email: user.email,id:id};
    const [newData, setNewData] = useState(initialInfo);

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newFormData = { ...newData };
        newFormData[field] = value;
        setNewData(newFormData);
      };

      const handleSubmit = () =>{
        
        setLoading(true);
       
       
        
        fetch('http://localhost:5000/comments', {
              method: 'POST',
              headers: {
                  'content-type': 'application/json'
              },
             body: JSON.stringify(newData),
          })
              .then(res => res.json())
              .then(data => {
                  if (data.insertedId) {
                      setSuccess(true);
                      setLoading(false);
                  }
              })
        
      }

  return (
    <>
        <Box>
        <TextField
              sx={{
                  mt:2
              }} 
              label="Add a comment..."
              name="comment"
              multiline
              variant="filled"
              onBlur={handleOnBlur}
            />
            <Button onClick={handleSubmit} sx={{mt:3,ml:2}} type="submit" variant="outlined">Add Comment</Button>

              
        </Box>
    </>
  )
}

export default AddComment