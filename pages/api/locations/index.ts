import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { supabase } from "@/libs/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ messg: "You must be logged in" });
  }
  const id = req.query.id;
  //Get LocationId
  if (req.method === "GET") {
    const { data: location } = await supabase
      .from("locations")
      .select("id")
      .eq("companies_id", id);
    const locationId = location?.[0].id;
    res.status(200).json({ locationId });
  }

  //Create
  if (req.method === "POST") {
    const { name, address, companyId } = req.body;
    const { data: locations } = await supabase
      .from("locations")
      .insert({ name, address, companies_id: companyId });
    res.status(200).json({ locations });
  }

  //Delete
  if (req.method === "DELETE") {
    const locationId = req.query.id;
    const { error: delete_menus_locations } = await supabase
      .from("menus_locations")
      .delete()
      .eq("locations_id", locationId);
    const { error: delete_locations } = await supabase
      .from("locations")
      .delete()
      .eq("id", locationId);
    res.status(200).json({ delete_menus_locations, delete_locations });
  }

  // Update
  if (req.method === "PUT") {
    const { name, address, locationId } = req.body;
    const { data: update, error } = await supabase
      .from("locations")
      .update({ name, address })
      .eq("id", locationId);
    res.status(200).json({ update, error });
  }

  res.status(401).json({ messsg: "ERRor" });
}
