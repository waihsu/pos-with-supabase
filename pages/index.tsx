import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    console.log(session.accessToken);
    const selectID = localStorage.getItem("selectedLocationId");
    console.log(selectID);
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
