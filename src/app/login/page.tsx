"use client";

export default function LoginPage() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}>
        {/* Logo/Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
          }}>
            🚀
          </div>
          <h1 style={{
            color: "#fff",
            fontSize: "24px",
            fontWeight: 600,
            margin: 0,
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "14px",
            marginTop: "8px",
          }}>
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{
              display: "block",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "8px",
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "8px",
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "8px",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.3)",
          fontSize: "13px",
          marginTop: "32px",
        }}>
          © 2026 My Startup. All rights reserved.
        </p>
      </div>
    </main>
  );
}
