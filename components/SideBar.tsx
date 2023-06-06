import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

import Logout from "./Logout";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { config } from "@/config/config";

const sidebarMenuItems = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/backoffice/orders",
  },
  {
    id: 2,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 4,
    label: "Addons",
    icon: <LunchDiningIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];

const SideBar = () => {
  const {
    mainBg,
    sideBarBgColor,
    navSyntaxColor,
    isMediumScreen,
    isSmallscreen,
  } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        width: isMediumScreen ? "80px" : "290px",
        display: "flex",
        justifyContent: "center",

        flexDirection: "column",
        background: `${sideBarBgColor}`,
        boxShadow: "0px 10px 10px rgba(20,20,20,.5)",
        opacity: 0.8,
      }}>
      <Box>
        <List>
          {sidebarMenuItems.slice(0, 6).map((menuItem) => (
            <Link
              key={menuItem.id}
              href={menuItem.route}
              style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ background: `${mainBg}`, scale: 1.1 }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        color: `${navSyntaxColor}`,
                        ml: isMediumScreen ? 1 : 0,
                      }}>
                      {menuItem.icon}
                    </ListItemIcon>

                    {isMediumScreen ? null : (
                      <ListItemText
                        primary={menuItem.label}
                        sx={{ color: `${navSyntaxColor}` }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarMenuItems.slice(-1).map((menuItem) => (
            <Link
              key={menuItem.id}
              href={menuItem.route}
              style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ background: `${mainBg}`, scale: 1.1 }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        color: `${navSyntaxColor}`,
                        ml: isMediumScreen ? 1 : 0,
                      }}>
                      {menuItem.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={menuItem.label}
                      sx={{
                        color: `${navSyntaxColor}`,
                        display: isMediumScreen ? "none" : "flex",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            </Link>
          ))}
        </List>
      </Box>
      <Button onClick={() => signOut()}>Logout</Button>
    </Box>
  );
};

export default SideBar;
