import { useState, useEffect, useContext } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { Box, Button } from "@mui/material";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { ThemeContext } from "../contexts/ThemeContext";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

const BlackAndWhite = {
  bg: "linear-gradient(73deg, rgba(0,0,0,0.6998521820837711) 0%, rgba(12,4,45,0.8987317339044993) 21%, rgba(83,20,26,0.9547541428680847) 100%)",
  mainBg:
    "linear-gradient(122deg, rgba(126,125,114,1) 0%, rgba(99,64,23,1) 100%)",
  navBgColor: "rgb(38,33,30",
  navSyntaxColor: "#3FFF00",
  syntax: "rgb(63,55,49)",
  spanSyntax: "rgb(86,86,86)",
  hoverColor: "#1d1160",
  changeTheme: (value: any) => {},
};

const defaultTheme = {
  bg: "linear-gradient(122deg, rgba(43,12,91,1) 0%, rgba(128,39,53,1) 21%, rgba(205,160,56,1) 83%, rgba(93,48,20,1) 100%)",
  mainBg:
    "linear-gradient(150deg, rgba(201,191,120,1) 0%, rgba(87,23,99,1) 100%)",
  navBgColor: "rgb(38,33,30)",
  navSyntaxColor: "#720e9e",
  syntax: "#fff",
  spanSyntax: "rgb(86,86,86)",
  hoverColor: "#841617",
};

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".button",
      isOpen
        ? { transform: "translateX(100px)" }
        : { transform: "translateX(0px)" },
      {
        type: "spring",
        duration: 0.3,

        bounce: 0,
      }
    );

    animate(
      ".ul",
      isOpen
        ? { opacity: 1, filter: "blur(0px)", transform: "translateX(0px)" }
        : { opacity: 0, filter: "blur(20px)", transform: "translateX(-300px)" },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      ".li",
      isOpen
        ? { opacity: 1, filter: "blur(0px)", transform: "translateX(0px)" }
        : { opacity: 0, filter: "blur(20px)", transform: "translateX(0px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const { changeTheme, ...data } = useContext(ThemeContext);
  // console.log(data);

  return (
    <Box ref={scope} sx={{}}>
      <div className="button">
        <motion.div>
          <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              width: 20,
              height: 69,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              background: `${data.navSyntaxColor}`,
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              gap: "1px",
            }}>
            <Box sx={{ width: 2, height: 26, bgcolor: "black" }}></Box>
            <Box sx={{ width: 2, height: 26, bgcolor: "red" }}></Box>
            <Box sx={{ width: 2, height: 26, bgcolor: "purple" }}></Box>
          </Box>
        </motion.div>
      </div>
      <div
        className="ul"
        style={{
          width: 100,

          padding: "14px 0",
          background: `${data.bg}`,
          opacity: 0.1,
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          gap: 2,
        }}>
        <div className="li">
          <Box
            sx={{
              width: 40,
              height: 40,
              background: `${data.hoverColor}`,
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => changeTheme(BlackAndWhite)}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 100,
                background: `${BlackAndWhite.bg}`,
              }}></Box>
          </Box>
        </div>
        <div className="li">
          <Box
            sx={{
              width: 40,
              height: 40,
              background:
                "linear-gradient(188deg, rgba(249,52,47,1) 0%, rgba(0,46,255,1) 100%)",
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => changeTheme(defaultTheme)}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 100,
                background: `${defaultTheme.bg}`,
              }}></Box>
          </Box>
        </div>
        {/*
        <div className="li">
          <Box
            sx={{
              width: 40,
              height: 40,
              background:
                "linear-gradient(55deg, rgba(212,221,216,1) 0%, rgba(158,164,161,1) 0%, rgba(0,0,0,1) 100%)",
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => changeTheme(dark)}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 100,
                background:
                  "linear-gradient(55deg, rgba(212,221,216,1) 0%, rgba(219,255,0,1) 100%, rgba(0,0,0,1) 100%)",
              }}></Box>
          </Box>
        </div>
        <div className="li">
          <Box
            sx={{
              width: 40,
              height: 40,
              background:
                "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => changeTheme(pink)}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 100,
                background:
                  "linear-gradient(55deg, rgba(212,221,216,1) 0%, rgba(0,255,127,1) 100%, rgba(0,0,0,1) 100%)",
              }}></Box> 
          </Box>
        </div> */}
      </div>
    </Box>
  );
}
