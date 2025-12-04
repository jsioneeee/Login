"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE } from "@/lib/config";
import { motion } from "framer-motion";

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

  const drops = Array.from({ length: 40 });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, #111827, #1f2937, #374151, #111827)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Rain effect */}
      {drops.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-0.5 rounded-full bg-indigo-400 opacity-40"
          style={{
            height: `${6 + Math.random() * 12}px`,
            opacity: 0.2 + Math.random() * 0.4,
            left: `${Math.random() * 100}vw`,
          }}
          initial={{ y: -50 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}

      {/* Centered glass container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg"
        >
          <Card className="p-6 sm:p-8 md:p-10 shadow-xl rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-300 hover:scale-[1.02] hover:border-indigo-500">
            <CardContent>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
              >
                Create Account
              </motion.h1>

              <motion.form
                onSubmit={handleRegister}
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-md bg-neutral-800/60 border-neutral-700 text-white placeholder-neutral-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500/40"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-md bg-neutral-800/60 border-neutral-700 text-white placeholder-neutral-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500/40"
                />
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-transform duration-300 hover:scale-[1.05]"
                  type="submit"
                >
                  Register
                </Button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <Button
                  variant="link"
                  className="mt-4 w-full text-sm text-indigo-400 hover:text-indigo-300"
                  onClick={() => router.push("/login")}
                >
                  Back to Login
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
