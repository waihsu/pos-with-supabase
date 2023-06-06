interface User {
  email: string;
  name: string;
  password?: string;
}

export const useSignup = () => {
  const getUser = async (email: string) => {
    const resp = await fetch(`/api/users/login?email=${email}`);
    const data = await resp.json();
    return data;
  };

  const singUp = async (user: User) => {
    const resp = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    console.log(data);
    return data;
  };
  return { singUp, getUser };
};
