import { config } from "@/config/config";
import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export const useMenuCategories = () => {
  const { fetchData } = useContext(AppContext);
  const updateMenuCategories = async ({
    id,
    name,
  }: {
    id: number;
    name: string;
  }) => {
    const resp = await fetch(`${config.nextauth}/api/menucategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });
    fetchData();
  };

  return { updateMenuCategories };
};
