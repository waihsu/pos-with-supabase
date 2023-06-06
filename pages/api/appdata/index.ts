import { supabase } from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ messg: "You must be logged in." });
  }

  if (req.method === "GET") {
    const email = req.query.email as string;
    try {
      const { data: UserResult } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);
      const user = UserResult?.[0];
      const companyId = user?.companies_id;

      const { data: company } = await supabase
        .from("companies")
        .select("*")
        .eq("id", companyId);

      //Location
      const { data: locations } = await supabase
        .from("locations")
        .select("*")
        .eq("companies_id", companyId);
      const locationId = locations?.[0].id as number;

      //menu_locations
      const { data: menu_locations } = await supabase
        .from("menus_locations")
        .select("*")
        .eq("locations_id", locationId);
      const menuIds = menu_locations?.map((menu) => menu.menus_id) as string[];

      //to get MenuId from menu_locations to get Menu
      const { data: menus } = await supabase
        .from("menus")
        .select("*")
        .in("id", menuIds);

      //Menus_Menu_Categories
      const { data: menus_menu_categories_locations } = await supabase
        .from("menus_menu_categories_locations")
        .select("*")
        .in("menus_id", menuIds);

      //to get MenusCategories  need MenuCategoriesId from MenusMenuCategories
      const menus_categoriesId = menus_menu_categories_locations?.map(
        (item) => item.menu_categories_id
      ) as string[];
      const { data: menus_categories } = await supabase
        .from("menus_categories")
        .select("*")
        .in("id", menus_categoriesId);

      //menuAddonCategories
      const { data: menus_addon_categories } = await supabase
        .from("menus_addon_categories")
        .select("*")
        .in("menus_id", menuIds);
      const addonCategoriesIds = menus_addon_categories?.map(
        (item) => item.addon_categories_id
      ) as string[];

      //AddonCategories
      const { data: addon_categories } = await supabase
        .from("addon_categories")
        .select("*")
        .in("id", addonCategoriesIds);
      //Addon
      const { data: addons } = await supabase
        .from("addons")
        .select("*")
        .in("addon_categories_id", addonCategoriesIds);

      res.status(200).json({
        menus,
        company,
        locations,
        menus_categories,
        menus_menu_categories_locations,
        menus_addon_categories,
        addon_categories,
        addons,
        companyId,
      });
    } catch (err) {
      console.log(err);
      res.status(200).json({ messg: "error" });
    }
  }
}
