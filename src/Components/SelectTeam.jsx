import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import useAuth from "../hooks/useAuth";

export default function SelectTeam(props) {
  const { users,logOut } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [loginData, setLoginData] = React.useState(props.loginData);

  const history = useHistory();

  // console.log(selectedOption?.value);

  const handleOnBlur = (e) => {
    const field = "team";
    const value = selectedOption?.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const user = users.map((e) => e.team);

  let data = [];
  for (let i = 0; i < user.length; i++) {
    data.push({ label: user[i], value: user[i] });
  }
  const handleTeamConfirm = () =>{
    
    fetch('http://localhost:5000/users/role', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
           body: JSON.stringify(loginData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    history.push('/dash')
                    // setSuccess(true);
                }
            })

  }

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={data}
        onBlur={handleOnBlur}
      />
      <Box sx={{ flexDirection: 'row',mt:3 }}>
                <Button sx={{mr:2 }} onClick={handleTeamConfirm} variant="contained">
              confirm
            </Button>
            <Button onClick={()=>logOut(history)} variant="contained">
              logout
            </Button>
            </Box>
    </div>
  );
}
