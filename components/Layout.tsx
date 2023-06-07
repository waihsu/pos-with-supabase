import { Box } from "@mui/material";
import SideBar from "./SideBar";
import { ReactNode, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Drawer from "./Drawer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { bg, mainBg } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        // background: `${bg}`,
        overflowX: "hidden",
        bgcolor: `${bg}`,
      }}>
      <Box sx={{ position: "absolute", zIndex: 1100 }}>
        <Drawer />
      </Box>
      <Box
        sx={{
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Box sx={{ width: "77vw" }}>
          <Box
            sx={{
              maxWidth: "80%",
              mx: "auto",
              boxShadow: "10px 10px 10px rgba(20,20,20,.5)",
              opacity: 0.8,
              bgcolor: `${mainBg}`,
            }}>
            {children}
          </Box>
        </Box>

        <Box position={"fixed"} right={0} zIndex={1000}>
          <SideBar />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
