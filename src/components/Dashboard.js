import React, { useEffect, useState } from "react";
import ButtonAppBar from "./Header.js";
import UserDataCard from "./Card.js";
import { ChakraProvider } from "@chakra-ui/react";
import ChakaraTable from "./Table.js";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      fetchUserData(loggedInUser.id);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <ButtonAppBar />
      <br />
      {userData && (
        <div>
          <h2>
            Welcome, <strong>{userData.username}</strong>!
          </h2>
          {/* <p>Your Password is {userData.password}</p> */}
        </div>
      )}
      <br />
      <UserDataCard />
      <br/>
      <ChakraProvider>
      <div className="m-5">
      <ChakaraTable />

      </div>
      </ChakraProvider>
    </div>
  );
};

export default Dashboard;