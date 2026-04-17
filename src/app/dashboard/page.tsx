"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    });
  }, [router]);

  // 背景图切换
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // 每5秒切换
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Loading...
      </div>
    );
  }

  const bgImages = ["/bg1.png", "/bg2.png"];

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 背景图容器 */}
      {bgImages.map((bg, index) => (
        <div
          key={bg}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%), url('${bg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentBg === index ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 0,
          }}
        />
      ))}

      {/* Top Bar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: "rgba(10, 10, 15, 0.6)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.3px",
            }}
          >
            Star
          </span>
        </div>

        {/* User & Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
            }}
          >
            {user?.email}
          </span>
          <button
            onClick={handleSignOut}
            style={{
              padding: "6px 16px",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            退出
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: "center", maxWidth: "700px" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Welcome
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(42px, 7vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "20px",
              letterSpacing: "-1px",
            }}
          >
            速度与激情
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              冠军之路
            </span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "16px",
              lineHeight: 1.7,
              margin: "0 auto 40px",
              maxWidth: "480px",
            }}
          >
            每一次出发，都是对极限的挑战。追逐梦想，永不止步。
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={() => router.push("/explore")}
              style={{
                padding: "14px 28px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.85)",
                fontSize: "15px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              开始探索
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "48px",
            marginTop: "100px",
            padding: "28px 48px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {[
            { num: "∞", label: "可能", size: "48px" },
            { num: "24/7", label: "在线", size: "34px" },
            { num: "100%", label: "热情", size: "34px" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "100px",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: stat.size,
                  fontWeight: 600,
                  lineHeight: 1,
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "13px",
                  height: "20px",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
