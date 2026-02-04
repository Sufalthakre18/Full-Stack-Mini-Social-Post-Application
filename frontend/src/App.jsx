import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Container } from "@mui/material";

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          } />
        </Routes>
      </Container>
    </>
  );
}
