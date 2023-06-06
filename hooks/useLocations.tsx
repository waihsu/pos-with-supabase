import { useContext } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

export const useLocation = () => {
  const { fetchData } = useContext(AppContext);

  //create location
  const createNewLocation = async (location: {
    name: string;
    address: string;
    companyId: number | null;
  }) => {
    const resp = await fetch(`/api/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    if (resp.ok) {
      fetchData();
    }
  };

  const deletelocation = async (id: number) => {
    const resp = await fetch(`/api/locations?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      fetchData();
    }
  };

  const updateLocation = async ({
    name,
    address,
    locationId,
  }: {
    name: string;
    address: string;
    locationId: number;
  }) => {
    const resp = await fetch(`/api/locations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, locationId }),
    });
    fetchData();
  };

  return { createNewLocation, deletelocation, updateLocation };
};
