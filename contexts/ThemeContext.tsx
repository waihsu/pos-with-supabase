import { useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface DefaultTheme {
  bg: string;
  mainBg: string;
  sideBarBgColor: string;
  syntax: string;
  spanSyntax: string;
  hoverColor: string;
  isSmallscreen: boolean;
  isMediumScreen: boolean;
  changeTheme: (value: any) => void;
}

const defaultTheme: DefaultTheme = {
  bg: "#FEBE10",
  mainBg: "#4C516D",
  sideBarBgColor: " #B0C4DE",
  syntax: "black",
  spanSyntax: "rgb(86,86,86)",
  hoverColor: "#841617",
  isSmallscreen: true,
  isMediumScreen: true,
  changeTheme: () => {},
};

export interface UiTheme {
  syntax: string;
  ui: string;
  bg: string;
}

export const ThemeContext = createContext(defaultTheme);

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(defaultTheme);

  const small = useTheme();
  const isSmallscreen = useMediaQuery(small.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(small.breakpoints.down("md"));

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        changeTheme: setTheme,
        isSmallscreen,
        isMediumScreen,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
