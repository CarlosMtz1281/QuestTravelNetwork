'use client';

import { useUser } from "./contexts/userContext";
import Login from "./login/page";

export default function Home() {
  const { user } = useUser();

  return (
    user ? (
      <h1>Dashboard - Landing page</h1>
    ) : (
      <Login />
    )
  );
}
