"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE } from "@/lib/config";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Register failed");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
      <Card className="w-full max-w-sm p-6 shadow-xl rounded-xl bg-neutral-900 border border-neutral-700">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6 text-center text-indigo-400">
            Create Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500/40"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500/40"
            />
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-transform hover:scale-[1.02]"
              type="submit"
            >
              Register
            </Button>
          </form>

          <Button
            variant="link"
            className="mt-4 w-full text-sm text-indigo-400 hover:text-indigo-300"
            onClick={() => router.push("/")}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
