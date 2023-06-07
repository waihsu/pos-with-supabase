import { supabase } from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "@/config/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  if (req.method === "POST") {
    const isValid =
      email && email.length > 0 && password && password.length > 0;
    if (!isValid) return res.status(401).json({ messg: "not valid" });
    const { data: User, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (!User?.length) return res.status(401).json({ messg: "user not found" });
    const userResult = User?.[0];
    const user = {
      id: userResult.id,
      name: userResult.name,
      email: userResult.email,
      companies_id: userResult.companies_id,
    };
    try {
      const correctPassword = await bcrypt.compare(
        password,
        userResult.password
      );
      if (!correctPassword) {
        res.status(200).json({ messg: "Wrong Password" });
      }
      const accessToken = jwt.sign(user, config.jwtSecret);

      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      res.status(401).json({ err });
    }
  }
  if (req.method === "GET") {
    const email = req.query.email as string;
    const { data: User, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (!User?.length) return res.status(401).json({ messg: "user not found" });
    res.status(200).json({ messg: "ok" });
  }
}
