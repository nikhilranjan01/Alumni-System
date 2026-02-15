// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AlumniList from "./pages/AlumniList";
import AddAlumni from "./pages/AddAlumni";
import EditAlumni from "./pages/EditAlumni";
import ViewAlumni from "./pages/ViewAlumni";
import AdminUsers from "./pages/AdminUsers";
import AdminAlumni from "./pages/AdminAlumni";
import AlumniProfile from "./pages/AlumniProfile";


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Admin-only route
const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === "admin"
    ? children
    : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni"
            element={
              <ProtectedRoute>
                <AlumniList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni/view/:id"
            element={
              <ProtectedRoute>
                <ViewAlumni />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni/profile/:id"
            element={
              <ProtectedRoute>
                <AlumniProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/alumni/add"
            element={
              <AdminRoute>
                <AddAlumni />
              </AdminRoute>
            }
          />

          <Route
            path="/alumni/edit/:id"
            element={
              <AdminRoute>
                <EditAlumni />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/alumni"
            element={
              <AdminRoute>
                <AdminAlumni />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
