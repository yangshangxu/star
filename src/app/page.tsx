"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      if (user) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Loading...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        你好,摩托佬! 🚀
      </h1>
      <p style={{ fontSize: "1.5rem", opacity: 0.9 }}>Ready to go?</p>
      <Link
        href="/login"
        style={{
          marginTop: "2rem",
          padding: "12px 24px",
          background: "rgba(255,255,255,0.2)",
          borderRadius: "8px",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 500,
          transition: "background 0.2s",
        }}
      >
        Go to Login →
      </Link>
    </main>
  );
}
