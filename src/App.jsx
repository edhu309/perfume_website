import PropTypes from "prop-types";


import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { CartProvider } from "./components/CartContext";
import { UserProvider, useUser } from "./components/UserContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



function AdminRoute({ children }) {
  AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const { user, initialized } = useUser();
  if (!initialized) {
    return null;
  }
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
