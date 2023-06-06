import { ReactNode, createContext, useEffect, useState } from "react";
import {
  Menu,
  MenuCategory,
  Addon,
  AddonCategory,
  MenuLocation,
  Company,
  Location,
} from "../types/Types";
import { config } from "../config/config";
import { useSession } from "next-auth/react";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/router";
// import { config } from "../config/config";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  menus_menu_categories_locations: [];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menuLocations: MenuLocation[];
  company: Company | null;
  companyId: number | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  menus_menu_categories_locations: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  company: null,
  companyId: null,
  updateData: () => {},
  fetchData: () => {},
};

interface Props {
  children: ReactNode;
}

export const AppContext = createContext(defaultContext);

const AppProvider = ({ children }: Props) => {
  const [data, updateData] = useState(defaultContext);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { getUser, singUp } = useSignup();

  useEffect(() => {
    if (session) {
      const checkUserandCreate = async () => {
        const data = await getUser(session.user?.email as string);
        if (data.messg === "user not found") {
          const registered = await singUp({
            email: session.user?.email as string,
            name: session.user?.name as string,
          });
          if (registered) {
            fetchData();
          }
        }
        if (data.messg === "ok") {
          fetchData();
        }
      };
      checkUserandCreate();
    }
  }, [session]);

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const fetchData = async () => {
    const response = await fetch(`/api/appdata?email=${session?.user?.email}`);
    const responseJson = await response.json();

    const {
      menus,
      menus_categories,
      menus_menu_categories_locations,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
      companyId,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories: menus_categories,
      menus_menu_categories_locations,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
      companyId,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
