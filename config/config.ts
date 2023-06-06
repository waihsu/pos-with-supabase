interface Config {
  supabaseUrl: string;
  supabaseSecretKey: string;
  serviceRow: string;
  jwtSecret: string;
  schema: string;
  githubID: string;
  githubKEY: string;
  nextauth: string;
  googleId: string;
  googleSecret: string;
}

export const config: Config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseSecretKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  jwtSecret: process.env.JWT_SECRET || "",
  serviceRow: process.env.SERVICE_ROW || "",
  schema: process.env.SCHEMA || "",
  githubID: process.env.GITHUB_ID || "",
  githubKEY: process.env.GITHUB_SECRET || "",
  nextauth: process.env.NEXTAUTH_URL || "",
  googleId: process.env.GOOGLE_ID || "",
  googleSecret: process.env.GOOGLE_SECRET || "",
};
