import React, { useEffect, useState } from "react";

export const userContext = React.createContext();
const UserContext = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const person = window.localStorage.getItem("user");
    setUser(JSON.parse(person));
  }, []);
  return (
    <userContext.Provider
      value={{ user, setUser,
       logoutUser: () => setUser("") }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserContext;
