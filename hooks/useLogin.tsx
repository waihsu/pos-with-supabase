import { config } from "../config/config";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const useLogin = () => {
  const login = async (user: { email: string; password: string }) => {
    const resp = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    return data;
  };
  return { login };
};

export default useLogin;
