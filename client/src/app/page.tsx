import { useUser } from "./contexts/userContext";
import Login from "./login/page";

export default function Home() {
  const { user, signInWithGoogle } = useUser();

  return (
    user ? (
      <h1>Dashboard - Landing page</h1>
    ) : (
      <Login signInWithGoogle={signInWithGoogle} />
    )
  );
}
