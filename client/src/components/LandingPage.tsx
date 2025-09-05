import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LandingPage() {
  const { isAuthenticated, name } = useAuth();
  return (
    <div className="w-40 flex flex-col gap-4">
      <h1>Landing Page</h1>
      {isAuthenticated && <h2>Hello {name}</h2>}
      <Button asChild>
        <Link to={"/chat"}>Go to chats</Link>
      </Button>
    </div>
  );
}
