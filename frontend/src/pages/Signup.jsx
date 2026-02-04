import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api.js";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await apiRequest("/auth/signup", {
        method: "POST",
        body: { username, email, password },
      });

  
      setSuccess(data.message || "Account created successfully");

 
      localStorage.setItem("token", data.token);
      login(data);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
