import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "@supabase/auth-helpers-nextjs";
export default function Component({ session }: { session: Session | null }) {
  // const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  if (session) {
    return (
      <>
        Signed in as {session.user?.name}
        {session.user?.email}
        {session.accessToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in</button>
    </>
  );
}
