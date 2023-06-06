import { useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface DefaultTheme {
  bg: string;
  mainBg: string;
  sideBarBgColor: string;
  navSyntaxColor: string;
  syntax: string;
  spanSyntax: string;
  hoverColor: string;
  isSmallscreen: boolean;
  isMediumScreen: boolean;
  changeTheme: (value: any) => void;
}

const defaultTheme: DefaultTheme = {
  bg: "linear-gradient(122deg, rgba(43,12,91,1) 0%, rgba(128,39,53,1) 21%, rgba(205,160,56,1) 83%, rgba(93,48,20,1) 100%)",
  mainBg:
    "linear-gradient(150deg, rgba(201,191,120,1) 0%, rgba(87,23,99,1) 100%)",
  sideBarBgColor:
    " linear-gradient(122deg, rgba(255,201,0,0.27306274072128855) 0%, rgba(255,139,0,0.15261456144957986) 100%)",
  navSyntaxColor: "#720e9e",
  syntax: "#fff",
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
