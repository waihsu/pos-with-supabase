import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Link from "next/link";

const Navbar = () => {
  const { mainBg } = useContext(ThemeContext);
  return (
    <Box
      sx={{
        background: `${mainBg}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        opacity: 0.8,
      }}>
      <Link href={"/"}>
        <Typography sx={{ textAlign: "center", py: 2 }}>Navbar</Typography>
      </Link>
    </Box>
  );
};

export default Navbar;
