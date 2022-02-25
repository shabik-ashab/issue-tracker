import { Button, Skeleton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const AddComment = ({ user, id }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const initialInfo = { name: user.displayName, email: user.email, id: id };
  const [newData, setNewData] = useState(initialInfo);

  useEffect(() => {
    const url = `http://localhost:5000/comments`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [loading]);

  const commentOnTicket = comments.filter((c) => c.id == id);
  console.log(commentOnTicket);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormData = { ...newData };
    newFormData[field] = value;
    setNewData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(!newData.comment){
        alert('Please write something!');
        setLoading(false);
        return;
    }

    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
          setNewData("")
          setSuccess(true);
          setLoading(false);
          
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            mt: 2,
          }}
          label="Add a comment..."
          name="comment"
          multiline
          variant="filled"
          onBlur={handleOnBlur}
        />
        <Button
          type="submit"
          sx={{ mt: 3, ml: 2 }}
          type="submit"
          variant="outlined"
        >
          Add Comment
        </Button>
      </form>

      <Box sx={{ mt: 2, mb: 2 }}>
        <hr />
      </Box>

      <Box>
          {
              commentOnTicket.map((comment) => (
                  <Box sx={{backgroundColor: "#e0e0e0",m:1,p:2,width:'40%'}}>
                    <Typography sx={{fontSize:'.7em',}}>
                        {comment.name}
                    </Typography>
                    <Typography >
                        {comment.comment}
                    </Typography>
                    
                  </Box>
              ))
          }
          {
                        loading &&
                        <Skeleton sx={{m:1}} variant="rectangular" width="40%"  height={80} />
                    }
      </Box>
    </>
  );
};

export default AddComment;
