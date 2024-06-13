import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../RegisterForm.css";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (response.ok) {
        navigate("/");
        toast.success("Registered Successfully!");
        alert("Registered Successfully");
      } else {
        console.log("Failed to create user");
        toast.error("Failed to create user, Try again");
        alert("Failed to create a user, Try again");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create user, Try again");
    }
  };

  return (
    <Container fluid className="register-container">
      <ToastContainer />
      <Box className="register-box">
        <Box className="register-form">
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Create a new account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box component="span" className="input-icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </Box>
                ),
              }}
            />
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box component="span" className="input-icon">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </Box>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box component="span" className="input-icon">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </Box>
                ),
              }}
            />
            <Button type="submit" variant="primary" className="register-button">
              SIGN UP
            </Button>
          </form>
          <Box className="login-link">
            Already have an account? <a href="/">Sign In</a>
          </Box>
        </Box>
        <Box className="register-welcome">
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1">
            {" "}
            Aspireit Task done using React JS <br /> Developed & Designed by
            Kevin Matthew Franklin
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
