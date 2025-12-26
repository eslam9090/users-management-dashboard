import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { authSlice } from "../redux/slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../redux/store/store";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";

      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    dispatch(authSlice.actions.loginStart());

    setTimeout(() => {
      if (email === "q@quantum.io" && password === "qTask123#") {
        dispatch(
          authSlice.actions.loginSuccess({
            access: "fake-token",
            refresh: "fake-refresh",
          })
        );
        localStorage.setItem("accessToken", "fake-token");
        localStorage.setItem("refreshToken", "fake-refresh");
      } else {
        dispatch(authSlice.actions.loginFailure("Invalid email or password"));
      }
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 450, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
              }}
            >
              <span className="material-icons" style={{ fontSize: 40 }}>
                person
              </span>
            </Avatar>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className="material-icons">email</span>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className="material-icons">lock</span>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </Box>

          <Paper sx={{ mt: 3, p: 2, bgcolor: "primary.50" }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Demo Credentials:</strong>
              <br />
              Email: q@quantum.io
              <br />
              Password: qTask123#
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};
