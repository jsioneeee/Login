"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion"; // ✅ animation library

interface JwtPayload {
  username: string;
}

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUsername(decoded.username);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <Card className="p-6 sm:p-8 md:p-10 shadow-2xl rounded-xl bg-neutral-900 border border-neutral-700 transition-transform duration-300 hover:scale-[1.02] hover:border-indigo-500">
          <CardContent className="text-center space-y-6">
            {/* Animated heading */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
            >
              {isClient && username
                ? `Welcome, ${username}`
                : "Welcome to My App"}
            </motion.h1>

            {/* Animated paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed"
            >
              This is a modern, secure, and responsive dashboard built with
              Next.js. Manage your account, explore features, and stay connected
              all in one place. Please be patient, logging-in/creating an
              account may take a while.
            </motion.p>

            {/* Animated buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-transform duration-300 hover:scale-[1.05]"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                className="w-full border-indigo-500 text-indigo-400 hover:text-indigo-300 hover:border-indigo-400 transition-transform duration-300 hover:scale-[1.05]"
                onClick={() => router.push("/register")}
              >
                Create an Account
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
