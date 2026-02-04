import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Mini Social</Typography>
        {user ? (
          <Button color="inherit" onClick={() => { logout(); navigate("/login"); }}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
