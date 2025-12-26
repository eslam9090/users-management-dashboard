import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { authSlice } from "../redux/slice/AuthSlice";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { ProfilePage } from "../pages/Profile";
import type { RootState } from "../redux/store/store";

export const Layout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [currentView, setCurrentView] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(
        authSlice.actions.loginSuccess({
          access: token,
          refresh: localStorage.getItem("refreshToken") || "",
        })
      );
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <span className="material-icons">menu</span>
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Management Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<span className="material-icons">logout</span>}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, px: 1 }}>
            Menu
          </Typography>
          <List>
            <ListItemButton
              selected={currentView === "dashboard"}
              onClick={() => {
                setCurrentView("dashboard");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <span className="material-icons">dashboard</span>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton
              selected={currentView === "profile"}
              onClick={() => {
                setCurrentView("profile");
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                <span className="material-icons">person</span>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {currentView === "dashboard" ? <Dashboard /> : <ProfilePage />}
      </Container>
    </Box>
  );
};
