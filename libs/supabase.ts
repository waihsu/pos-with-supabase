import { config } from "@/config/config";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  `${config.supabaseUrl}`,
  `${config.supabaseSecretKey}`,
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: false,
    },
  }
);
