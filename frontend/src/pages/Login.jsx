import { TextField, Button, Paper } from "@mui/material";
import { useState, useContext } from "react";
import { apiRequest } from "../api/api.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: form,
    });
    login(data);
    navigate("/feed");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={submit}>
        <TextField label="Email" fullWidth onChange={e => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" type="password" fullWidth sx={{ mt: 2 }} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Paper>
  );
}
