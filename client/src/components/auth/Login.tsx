import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && name.trim()) {
      login(username.trim(), name.trim());
      navigate("/chat");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Already authenticated!");
      navigate("/chat");
    }
    console.log(username);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to access the chat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!username.trim() || !name.trim()}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
