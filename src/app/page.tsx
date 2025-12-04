"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import Image from "next/image";

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

  const drops = Array.from({ length: 40 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background animation */}
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
      {isClient &&
        drops.map((_, i) => (
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

      {/* Centered layout container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col md:flex-row max-w-6xl w-full max-h-[600px] rounded-xl overflow-hidden">
          {/* Left: Robot image with glass background */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-l-xl"
          >
            <Image
              src="/img2.png"
              alt="Futuristic robot"
              width={600}
              height={600}
              className="object-contain w-full h-full"
              priority
            />
          </motion.div>

          {/* Right: Login card with glass background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-r-xl shadow-2xl"
          >
            <Card className="w-full max-w-md p-8 bg-transparent border-none">
              <CardContent className="text-center space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl font-bold text-indigo-400"
                >
                  {isClient && username
                    ? `Welcome, ${username}`
                    : "Hello! Welcome to my App"}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm text-neutral-300"
                >
                  Enter your credentials to continue
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-3"
                >
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                    onClick={() => router.push("/login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-indigo-500 text-indigo-400 hover:text-indigo-300 hover:border-indigo-400"
                    onClick={() => router.push("/register")}
                  >
                    Create Account
                  </Button>
                </motion.div>

                <p className="text-xs text-neutral-400 mt-2">
                  Or continue with
                </p>

                {/* Social login icons (placeholder) */}
                <div className="flex justify-center gap-4 mt-2">
                  {/* First circle with Google */}
                  <img
                    src="/google.jpg"
                    alt="Google"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  {/* Second circle with Facebook */}
                  <img
                    src="/facebook.jpg"
                    alt="Facebook"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  {/* Third circle with GitHub */}
                  <img
                    src="/github.jpg"
                    alt="GitHub"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>

                <p className="text-xs text-neutral-400 mt-4">
                  Don't have an account?{" "}
                  <span
                    className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
                    onClick={() => router.push("/register")}
                  >
                    Create Account
                  </span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
