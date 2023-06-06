import { supabase } from "@/libs/supabase";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  if (req.method === "POST") {
    const isValid = name && name.length > 0 && email && email.length > 0;
    if (!isValid)
      return res.status(200).json({ error: "All fields must be fill" });
    try {
      const { data: userExist } = await supabase
        .from("users")
        .select("email")
        .eq("email", email);
      if (userExist?.length)
        return res.status(401).json({ messg: "User Already exists" });
      //Company
      const { data: Company } = await supabase
        .from("companies")
        .insert({ name: "Default Company Name" })
        .select("id");
      const companyId = Company?.[0].id;

      //User
      // const hashedPassword = await bcrypt.hash(password, 10);
      const { data: User, error: UserError } = await supabase
        .from("users")
        .insert({
          name,
          email,
          companies_id: companyId,
        })
        .select("*");

      const newUser = User?.[0];

      //Locations
      const { data: locations, error: LocatinError } = await supabase
        .from("locations")
        .insert({
          name: "Default location",
          address: "Default address",
          companies_id: companyId,
        })
        .select("*");
      const locationId = locations?.[0].id;

      //Menus
      const { data: Menu, error } = await supabase
        .from("menus")
        .insert([
          { name: "Noddle", price: 1000 },
          { name: "La-Phat-Toke", price: 1200 },
        ])
        .select("id");
      const menuId1 = Menu?.[0].id;
      const menuId2 = Menu?.[1].id;

      // Menus_Locations
      const { data: Menus_Locations } = await supabase
        .from("menus_locations")
        .insert([
          { menus_id: menuId1, locations_id: locationId },
          { menus_id: menuId2, locations_id: locationId },
        ]);

      //Menu_Categories
      const { data: menu_categorires } = await supabase
        .from("menus_categories")
        .insert([
          { name: "defaultMenuCategory1" },
          { name: "defaultMenuCategory2" },
        ])
        .select("id");
      const defaultMenuCategoryId1 = menu_categorires?.[0].id;
      const defaultMenuCategoryId2 = menu_categorires?.[1].id;

      //Menus_Menu_Categories
      const { data: menus_menu_categories_locations } = await supabase
        .from("menus_menu_categories_locations")
        .insert([
          {
            menus_id: menuId1,
            menu_categories_id: defaultMenuCategoryId1,
            locations_id: locationId,
          },
          {
            menus_id: menuId2,
            menu_categories_id: defaultMenuCategoryId2,
            locations_id: locationId,
          },
        ]);

      //Addon_Categories
      const { data: addon_categories } = await supabase
        .from("addon_categories")
        .insert([
          { name: "Drinks", is_required: "TRUE" },
          { name: "Size", is_required: "TRUE" },
        ])
        .select("id");
      const defaultAddonCategoriesId1 = addon_categories?.[0].id;
      const defaultAddonCategoriesId2 = addon_categories?.[1].id;

      //Menu_Addon_Categories
      const { data: menus_addon_categories } = await supabase
        .from("menus_addon_categories")
        .insert([
          { menus_id: menuId1, addon_categories_id: defaultAddonCategoriesId1 },
          { menus_id: menuId2, addon_categories_id: defaultAddonCategoriesId2 },
        ]);

      //Addon
      const { data: addon } = await supabase.from("addons").insert([
        {
          name: "Cola",
          price: 100,
          addon_categories_id: defaultAddonCategoriesId1,
        },
        {
          name: "Pepsi",
          price: 200,
          addon_categories_id: defaultAddonCategoriesId1,
        },
        {
          name: "Normal",
          price: 0,
          addon_categories_id: defaultAddonCategoriesId2,
        },
        {
          name: "Large",
          price: 40,
          addon_categories_id: defaultAddonCategoriesId2,
        },
      ]);

      res.status(200).json({ messg: "ok" });
      //   if (result) return res.status(200).json({ messg: "User Already Exists" });
    } catch (err) {
      console.log(err);
      res.status(401).json({ messg: err });
    }
  }
}
