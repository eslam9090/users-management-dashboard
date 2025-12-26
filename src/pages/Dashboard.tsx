import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSlice } from "../redux/slice/UserSlice";
import type { RootState } from "../redux/store/store";
import type { User } from "../types/types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { UserDetailsModal } from "../components/UserDetailsModal";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error, searchQuery, currentPage } = useSelector(
    (state: RootState) => state.users
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const USERS_PER_PAGE = 10;

  const fetchUsers = useCallback(async () => {
    dispatch(usersSlice.actions.fetchUsersStart());
    try {
      const response = await fetch("https://randomuser.me/api/?results=50");
      const data = await response.json();
      dispatch(usersSlice.actions.fetchUsersSuccess(data.results));
    } catch {
      dispatch(usersSlice.actions.fetchUsersFailure("Failed to fetch users"));
    }
  }, [dispatch]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  }, [users, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) =>
            dispatch(usersSlice.actions.setSearchQuery(e.target.value))
          }
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className="material-icons">search</span>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<span className="material-icons">refresh</span>}
          onClick={fetchUsers}
        >
          Refresh
        </Button>
      </Box>

      {paginatedUsers.length === 0 ? (
        <Alert severity="info">No users found</Alert>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {paginatedUsers.map((user) => (
              <Grid container spacing={2} key={user.login.uuid}>
                <Card
                  sx={{
                    height: "100%",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        minWidth: "300px",
                      }}
                    >
                      <Avatar
                        src={user.picture.thumbnail}
                        alt={user.name.first}
                      />
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          noWrap
                        >
                          {user.name.first} {user.name.last}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 2,
                      }}
                    >
                      <span
                        className="material-icons"
                        style={{ fontSize: 16, color: "#666" }}
                      >
                        location_on
                      </span>
                      <Typography variant="body2" color="text.secondary">
                        {user.location.city}, {user.location.country}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => setSelectedUser(user)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) =>
                dispatch(usersSlice.actions.setCurrentPage(page))
              }
              color="primary"
              size="large"
            />
          </Box>
        </>
      )}

      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </Box>
  );
};
