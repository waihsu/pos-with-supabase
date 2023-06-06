import { useContext } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

export const useCreateMenu = () => {
  const { fetchData } = useContext(AppContext);
  // const uploadImage = async (selectedFiles: File[]) => {
  //   const formData = new FormData();
  //   formData.append("files", selectedFiles[0]);
  //   const resp = await fetch(`${config.apiBaseUrl}/assets`, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await resp.json();
  //   const asset_url = data.assetUrl;
  //   return asset_url;
  // };

  //
  const createNewMenu = async (newMenu: {
    name: string;
    description: string;
    price: number;
    asset_url: string;
    companyId: number;
  }) => {
    const resp = await fetch("/api/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
  };

  //Delete
  const deleteMenu = async (id: number, asset_url: string) => {
    const resp = await fetch(`/api/menus?id=${id}&&asset_url=${asset_url}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return { createNewMenu, deleteMenu };
};
