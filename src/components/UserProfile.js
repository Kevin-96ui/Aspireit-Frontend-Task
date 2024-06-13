import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import ButtonAppBar from "./Header.js";
import "../UserProfile.css";
import { ToastContainer, toast } from 'react-toastify';

const UserProfile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [userData, setUserData] = useState({
    id: loggedInUser.id,
    username: loggedInUser.username,
    email: loggedInUser.email,
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Fetch user data from the '/profile' endpoint
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${loggedInUser.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserData({
          id: data.id,
          username: data.username,
          email: data.email,
          newPassword: "",
          confirmNewPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [loggedInUser.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.newPassword === userData.confirmNewPassword) {
      try {
        console.log('Submitting form with user data:', userData);
        const updatedUserData = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
        };

        if (userData.newPassword) {
          updatedUserData.password = userData.newPassword;
        }

        const response = await fetch(`http://localhost:5000/users/${userData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedUserData),
        });

        if (response.ok) {
          console.log("Profile updated successfully");
          toast.success("Pasword Updated Successfully!");
          alert("Pasword Updated Successfully");
        } else {
          console.error("Failed to update profile");
          alert("Profile Updation Failed");
          toast.error("Profile Updation Failed");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Profile Updation Failed");
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div>
      <ButtonAppBar />
      <Container className="profile-container">
        <ToastContainer/>
        <Card className="profile-card border-0 shadow p-5">
          <Card.Body>
            <Card.Title>User Profile</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={userData.username}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmNewPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmNewPassword"
                  value={userData.confirmNewPassword}
                  onChange={handleChange}
                />
              </Form.Group>
              {!passwordsMatch && (
                <div className="text-danger">Passwords do not match</div>
              )}
              <br />
              <Button variant="primary" type="submit" className="ml-2">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserProfile;