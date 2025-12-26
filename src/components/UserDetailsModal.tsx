import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
import type { User } from "../types/types";

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
}

export const UserDetailsModal = ({ user, onClose }: UserDetailsModalProps) => {
  if (!user) return null;

  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const fullAddress = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} ${user.location.postcode}`;

  return (
    <Modal open={!!user} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          maxWidth: 500,
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            User Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <span className="material-icons">close</span>
          </IconButton>
        </Box>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            src={user.picture.large}
            alt={fullName}
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />
          <Typography variant="h6" fontWeight="bold">
            {fullName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="bold"
            >
              Email
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="bold"
            >
              Phone
            </Typography>
            <Typography variant="body1">{user.phone}</Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="bold"
            >
              Address
            </Typography>
            <Typography variant="body1">{fullAddress}</Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
