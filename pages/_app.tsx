import type { AppProps } from "next/app";
import AppProvider from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import ThemeContextProvider from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <ThemeContextProvider>
          <Layout>
            <Navbar />
            <Component {...pageProps} />
          </Layout>
        </ThemeContextProvider>
      </AppProvider>
    </SessionProvider>
  );
}
