import { supabase } from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res.status(401).json({ messg: "You must be logged." });
  // }

  //Read
  if (req.method === "GET") {
    console.log(req.query.email);
    res.status(200).json({ messg: "success" });
  }

  //Create
  if (req.method === "POST") {
    const { name, price, description, asset_url, companyId } = req.body;
    if (!name || !price || !description || !companyId || !asset_url)
      return res.status(401).json({ messg: "All fields must be fill" });
    try {
      const { data: menuResult } = await supabase
        .from("menus")
        .insert({ name, price, description, asset_url })
        .select("id");
      const menuId = menuResult?.[0].id;

      //needLocationID
      const { data: location } = await supabase
        .from("locations")
        .select("id")
        .eq("companies_id", companyId);

      const locationId = location?.[0].id;

      const { data: menus_locations } = await supabase
        .from("menus_locations")
        .insert({ menus_id: menuId, locations_id: locationId })
        .select("*");
      res.status(200).json({ messg: "success" });
    } catch (err) {
      console.log(err);
      res.status(401).json({ err });
    }
  }

  // Delete
  if (req.method === "DELETE") {
    const { id: menuId, asset_url } = req.query;
    const imageUrltoString = asset_url?.toString().split("/");
    const imageUrl = imageUrltoString?.[imageUrltoString.length - 1];
    // console.log(imageUrl);

    const { data: delete_image } = await supabase.storage
      .from("menus_asset_url")
      //@ts-ignore
      .remove(imageUrl);
    const { data: delete_menus_menu_categories } = await supabase
      .from("menus_menu_categories")
      .delete()
      .eq("menus_id", menuId);
    const { data: delete_menus_addon_categories } = await supabase
      .from("menus_addon_categories")
      .delete()
      .eq("menus_id", menuId);
    const { data: delete_menus_locations } = await supabase
      .from("menus_locations")
      .delete()
      .eq("menus_id", menuId);
    const { data: delete_menus } = await supabase
      .from("menus")
      .delete()
      .eq("id", menuId);
    res.send({
      delete_image,
      delete_menus_menu_categories,
      delete_menus_addon_categories,
      delete_menus_locations,
      delete_menus,
    });
  }
}
