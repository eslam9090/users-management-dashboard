import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileSlice } from "../redux/slice/ProfileSlice";
import type { RootState } from "../redux/store/store";
import type { ProfileState } from "../types/types";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [formData, setFormData] = useState({
    name: profile.name,
    phone: profile.phone,
    jobTitle: profile.jobTitle,
    yearsOfExperience: profile.yearsOfExperience,
    address: profile.address,
    workingHours: profile.workingHours,
  });
  const [errors, setErrors] = useState<Partial<ProfileState>>({});
  const validate = () => {
    const newErrors: Partial<ProfileState> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!formData.yearsOfExperience)
      newErrors.yearsOfExperience = "Years of experience is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.workingHours)
      newErrors.workingHours = "Working hours is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(profileSlice.actions.updateProfileStart());
    setTimeout(() => {
      dispatch(profileSlice.actions.updateProfileSuccess(formData));
      setTimeout(() => dispatch(profileSlice.actions.clearSuccess()), 3000);
    }, 1000);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Edit Profile
      </Typography>

      <Snackbar
        open={profile.success}
        autoHideDuration={3000}
        onClose={() => dispatch(profileSlice.actions.clearSuccess())}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="material-icons">person</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="material-icons">phone</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="material-icons">work</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Years of Experience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsOfExperience: e.target.value,
                    })
                  }
                  error={!!errors.yearsOfExperience}
                  helperText={errors.yearsOfExperience}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="material-icons">timeline</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  error={!!errors.address}
                  helperText={errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="material-icons">location_on</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Working Hours"
                  value={formData.workingHours}
                  onChange={(e) =>
                    setFormData({ ...formData, workingHours: e.target.value })
                  }
                  error={!!errors.workingHours}
                  helperText={errors.workingHours}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="material-icons">schedule</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={profile.loading}
                  startIcon={
                    profile.loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <span className="material-icons">save</span>
                    )
                  }
                >
                  {profile.loading ? "Saving..." : "Save Changes"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
