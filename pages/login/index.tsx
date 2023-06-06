import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { useRouter } from "next/router";
import { config } from "@/config/config";

const Login = () => {
  const navigate = useRouter();
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({ email: "", password: "" });

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: true,
      callbackUrl: "/",
    });
    // const data = await login(user);
    // // console.log(data);
    // setError(data.messg);
    // if (data.messg === "success") {
    //   navigate.push("/");
    // }
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 4,
          maxWidth: 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mx: "auto",
          p: 6,
          border: 1,
          borderColor: "aquamarine",
        }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 700 }}>
          Created By Wai
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 6, gap: 4 }}>
          <TextField
            id="outlined-basic"
            value={user.email}
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            value={user.password}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <Button onClick={onSubmit} variant="contained">
            Log in
          </Button>

          {error ? (
            <Typography
              sx={{
                textAlign: "center",
                color: "red",
                fontSize: 20,
                fontWeight: "bold",
                mt: 4,
              }}>
              {error}
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 4 }}>
          <Divider sx={{ width: "40%" }} />
          <Typography>OR</Typography>
          <Divider sx={{ width: "40%" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1,
            borderColor: "black",
            gap: 2,
            p: 2,
            mt: 2,
          }}>
          <Button
            onClick={() =>
              signIn("google", {
                callbackUrl: "",
              })
            }
            variant="contained">
            <GoogleIcon />
            <Typography>Log in With Google</Typography>
          </Button>
          <Button
            onClick={() =>
              signIn("github", {
                redirect: true,
                callbackUrl: "http://localhost:3000",
              })
            }
            sx={{ bgcolor: "black" }}
            variant="contained">
            <GitHubIcon />
            <Typography>Log in With Github</Typography>
          </Button>
          <Button
            onClick={() => {
              signIn("facebook", {
                callbackUrl: "https://blog-with-auth-eta.vercel.app",
              });
            }}
            variant="contained">
            <FacebookIcon />
            <Typography>Log in With Facebook</Typography>
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          Forgot password
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 400,
          textAlign: "center",
          mx: "auto",
          mt: 4,
          px: 6,
          py: 3,
          border: 1,
          borderColor: "aquamarine",
        }}>
        <Typography>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center", my: 2 }}>Get the app.</Typography>
    </Box>
  );
};

export default Login;
