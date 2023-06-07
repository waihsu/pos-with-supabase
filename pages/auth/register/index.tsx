import { supabase } from "@/libs/supabase";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const register = async () => {
    // const { data, error } = await supabase.auth.signUp(user);
    // if (data.user) {
    //   router.push("/");
    // }
    const resp = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (resp.ok) {
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        mt: 10,
        gap: 6,
      }}>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(evt) => {
          setUser({ ...user, name: evt.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(evt) => {
          setUser({ ...user, email: evt.target.value });
        }}
      />
      <TextField
        type="password"
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(evt) => {
          setUser({ ...user, password: evt.target.value });
        }}
      />
      <Button onClick={register} variant="contained">
        Register
      </Button>
    </Box>
  );
};

export default Register;
