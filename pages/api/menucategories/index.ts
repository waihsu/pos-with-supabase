import { supabase } from "@/libs/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id: menuCategoriesId, name } = req.body;
    const { data: menus_categories } = await supabase
      .from("menus_categories")
      .update({ name })
      .eq("id", menuCategoriesId);
    res.status(200).json({ menuCategoriesId });
  }
}
