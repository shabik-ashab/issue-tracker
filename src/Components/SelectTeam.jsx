import React, { useState, useEffect } from "react";
import Select from "react-select";
import useAuth from "../hooks/useAuth";

export default function SelectTeam() {
  const { users } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);

  const user = users.map((e) => e.team);

  let data = [];
  for (let i = 0; i < user.length; i++) {
    data.push({ label: user[i], value: user[i] });
  }

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={data}
      />
    </div>
  );
}
