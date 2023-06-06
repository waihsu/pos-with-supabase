import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import useLogout from "../hooks/useLogout";

export default function Logout() {
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        onClick={handleToggle}
        sx={{ width: "fit-width", bgcolor: "red" }}>
        Logout
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}>
        <Box>
          <Typography variant="h4">Are you sure want to exit.</Typography>
          <Button
            onClick={handleClose}
            sx={{ bgcolor: "lightsteelblue", color: "blue" }}>
            Cancle
          </Button>
          <Button
            onClick={() => {
              handleClose();
              logout();
            }}
            sx={{ bgcolor: "red", color: "white" }}>
            Log out
          </Button>
        </Box>
      </Backdrop>
    </div>
  );
}
