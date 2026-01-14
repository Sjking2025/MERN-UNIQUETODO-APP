import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckSquare, LogOut, Smile, Star } from "lucide-react";
import { Button } from "./ui/Button";

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  const location = useLocation();

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: "rgba(10, 10, 20, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    color: "white",
  };

  const logoIconStyle = {
    padding: "8px",
    borderRadius: "8px",
    background: "rgba(139, 92, 246, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const pointsBadgeStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "rgba(245, 158, 11, 0.2)",
    color: "#fbbf24",
    fontSize: "14px",
    fontWeight: "500",
  };

  const moodLinkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    background: isActive ? "rgba(139, 92, 246, 0.2)" : "transparent",
    color: isActive ? "#a78bfa" : "rgba(255,255,255,0.6)",
    transition: "all 0.2s",
  });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={navStyle}
    >
      <div style={containerStyle}>
        {/* Logo */}
        <Link to="/" style={logoStyle}>
          <div style={logoIconStyle}>
            <CheckSquare size={20} color="#8b5cf6" />
          </div>
          <span style={{ fontSize: "18px", fontWeight: "bold", background: "linear-gradient(135deg, #a78bfa, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            TaskFlow
          </span>
        </Link>

        {/* Nav Links */}
        <div style={navLinksStyle}>
          {isAuthenticated ? (
            <>
              {/* Points Badge */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={pointsBadgeStyle}>
                <Star size={14} fill="currentColor" />
                <span>{user?.points || 0}</span>
              </motion.div>

              {/* Mood Link */}
              <Link to="/mood-tracker" style={moodLinkStyle(location.pathname === "/mood-tracker")}>
                <Smile size={18} />
                <span>Mood</span>
              </Link>

              {/* Logout */}
              <button
                onClick={onLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
