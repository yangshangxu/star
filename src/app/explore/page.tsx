"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { isShanghaiUser, retryLocation, checkLocationPermission } from "@/lib/geo";
import type { User } from "@supabase/supabase-js";

export default function ExplorePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShanghai, setIsShanghai] = useState<boolean | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [permissionDeniedPermanently, setPermissionDeniedPermanently] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        // 检查用户是否为上海
        const result = await isShanghaiUser();
        if (result === "denied") {
          // 检查是否为永久拒绝
          const perm = await checkLocationPermission();
          setPermissionDeniedPermanently(perm === "denied");
          setLocationDenied(true);
        } else {
          setIsShanghai(result);
        }
        setLoading(false);
      }
    });
  }, [router]);

  const handleRetryLocation = async () => {
    // 先检查权限状态
    const perm = await checkLocationPermission();
    if (perm === "denied") {
      // 永久拒绝，需要手动开启
      setPermissionDeniedPermanently(true);
      return;
    }

    const result = await retryLocation();
    if (result) {
      setIsShanghai(true);
      setLocationDenied(false);
      setPermissionDeniedPermanently(false);
    }
  };

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
          background: "#f5f5f5",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <span style={{ color: "#666" }}>Loading...</span>
      </div>
    );
  }

  // 位置被拒绝或非上海用户显示提示
  if (isShanghai === false || locationDenied) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f8f8",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #e5e5e5",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "56px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <img src="/logo.svg" alt="Logo" width={32} height={32} />
                <span style={{ color: "#1a1a1a", fontSize: "18px", fontWeight: 600 }}>Star</span>
              </Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#666", fontSize: "13px" }}>{user?.email}</span>
              <button
                onClick={handleSignOut}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                  background: "#fff",
                  color: "#666",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                退出
              </button>
            </div>
          </div>
        </header>

        {/* Restriction Notice */}
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "#fff",
              padding: "48px",
              borderRadius: "16px",
              border: "1px solid #e5e5e5",
              maxWidth: "480px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚫</div>
            <h2 style={{ color: "#1a1a1a", fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>
              {locationDenied ? "需要获取位置权限" : "仅对上海用户开放"}
            </h2>
            <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
              {permissionDeniedPermanently
                ? "位置权限已被永久拒绝，请在浏览器设置中开启"
                : locationDenied
                ? "请允许获取位置以便我们验证您的所在地区"
                : "很抱歉，本论坛目前仅对上海地区用户开放，敬请期待！"}
            </p>

            {permissionDeniedPermanently ? (
              <div style={{ textAlign: "left", background: "#f5f5f5", padding: "16px", borderRadius: "8px", marginTop: "16px" }}>
                <p style={{ color: "#666", fontSize: "13px", marginBottom: "8px" }}>
                  <strong>开启方法：</strong>
                </p>
                <ol style={{ color: "#888", fontSize: "12px", margin: 0, paddingLeft: "20px", lineHeight: 1.8 }}>
                  <li>点击地址栏左侧的 🔒 图标</li>
                  <li>在站点权限中找到位置</li>
                  <li>选择允许</li>
                  <li>刷新本页</li>
                </ol>
              </div>
            ) : locationDenied ? (
              <button
                onClick={handleRetryLocation}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                重新获取位置
              </button>
            ) : null}
          </div>
        </main>

        {/* Buy Me a Juice */}
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            background: "#fff",
            borderTop: "1px solid #e5e5e5",
          }}
        >
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>如果Star对你有帮助，欢迎支持一下</p>
          <a
            href="https://ko-fi.com/yangshangxupro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid #e5e5e5",
              background: "#fff",
              color: "#1a1a1a",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.background = "#667eea";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e5e5e5";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#1a1a1a";
            }}
          >
            🍊 Buy Me a Juice
          </a>
        </div>
      </div>
    );
  }

  // 加载中或上海用户
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f8f8",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e5e5",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <img src="/logo.svg" alt="Logo" width={32} height={32} />
              <span style={{ color: "#1a1a1a", fontSize: "18px", fontWeight: 600 }}>Star</span>
            </Link>
            <span style={{ color: "#d1d1d1", marginLeft: "8px" }}>|</span>
            <span style={{ color: "#666", fontSize: "14px" }}>论坛</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#666", fontSize: "13px" }}>{user?.email}</span>
            <button
              onClick={handleSignOut}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #e5e5e5",
                background: "#fff",
                color: "#666",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              退出
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Forum Header */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "24px", border: "1px solid #e5e5e5" }}>
          <h1 style={{ color: "#1a1a1a", fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>欢迎来到 Star 论坛</h1>
          <p style={{ color: "#888", fontSize: "14px" }}>夏天骑车,冬天滑雪</p>
        </div>

        {/* Post Categories */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {[
            { icon: "⛷️", title: "滑雪交流", desc: "分享滑雪心得与经验", count: 0 },
            { icon: "🏍️", title: "机车交流", desc: "讨论机车相关的任何话题", count: 0 },
            { icon: "💬", title: "闲聊区", desc: "随便聊聊", count: 0 },
          ].map((category, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #e5e5e5",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#e5e5e5";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{category.icon}</div>
              <h3 style={{ color: "#1a1a1a", fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>{category.title}</h3>
              <p style={{ color: "#888", fontSize: "13px", marginBottom: "12px" }}>{category.desc}</p>
              <span style={{ color: "#999", fontSize: "12px" }}>{category.count} 帖子</span>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e5e5" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
            <h2 style={{ color: "#1a1a1a", fontSize: "16px", fontWeight: 600 }}>最新帖子</h2>
          </div>
          
          {[
            { title: "欢迎大家来到 Star 论坛！", author: "Admin", time: "刚刚", tag: "公告" },
            { title: "这里暂时还没有帖子", author: "System", time: "刚刚", tag: "系统" },
          ].map((post, i) => (
            <div
              key={i}
              style={{
                padding: "16px 20px",
                borderBottom: i === 0 ? "1px solid #f0f0f0" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#fafafa";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#fff";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {post.author[0]}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span
                      style={{
                        background: "#f0f0f0",
                        color: "#666",
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {post.tag}
                    </span>
                    <span style={{ color: "#1a1a1a", fontSize: "14px", fontWeight: 500 }}>{post.title}</span>
                  </div>
                  <span style={{ color: "#999", fontSize: "12px" }}>{post.author} · {post.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buy Me a Juice */}
        <div
          style={{
            marginTop: "32px",
            textAlign: "center",
            padding: "24px",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
          }}
        >
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>如果Star对你有帮助，欢迎支持一下</p>
          <a
            href="https://ko-fi.com/yangshangxupro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid #e5e5e5",
              background: "#fff",
              color: "#1a1a1a",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.background = "#667eea";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e5e5e5";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#1a1a1a";
            }}
          >
            🍊 Buy Me a Juice
          </a>
        </div>
      </main>
    </div>
  );
}
