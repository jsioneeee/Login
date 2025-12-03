"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { saveToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE } from "@/lib/config";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      saveToken(data.accessToken);
      router.push("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <Card className="p-6 sm:p-8 md:p-10 shadow-xl rounded-xl bg-neutral-900 border border-neutral-700 transition-transform duration-300 hover:scale-[1.02] hover:border-indigo-500">
          <CardContent>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
            >
              Sign In
            </motion.h1>

            <motion.form
              onSubmit={handleLogin}
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-transform duration-300 hover:scale-[1.05]"
                type="submit"
              >
                Login
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="link"
                className="mt-4 w-full text-sm text-indigo-400 hover:text-indigo-300"
                onClick={() => router.push("/register")}
              >
                Create an account
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
