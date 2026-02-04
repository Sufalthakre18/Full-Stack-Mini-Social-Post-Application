import { TextField, Button, Paper } from "@mui/material";
import { useState, useContext } from "react";
import { apiRequest } from "../api/api.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = await apiRequest("/auth/signup", {
      method: "POST",
      body: form,
    });
    login(data);
    navigate("/feed");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={submit}>
        <TextField label="Username" fullWidth onChange={e => setForm({ ...form, username: e.target.value })} />
        <TextField label="Email" fullWidth sx={{ mt: 2 }} onChange={e => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" type="password" fullWidth sx={{ mt: 2 }} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Signup</Button>
      </form>
    </Paper>
  );
}
