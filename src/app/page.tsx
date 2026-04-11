import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white"
    }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        Hello World! 🚀
      </h1>
      <p style={{ fontSize: "1.5rem", opacity: 0.9 }}>
        My Startup is ready to go!
      </p>
      <div style={{ marginTop: "2rem", padding: "1rem 2rem", background: "rgba(255,255,255,0.2)", borderRadius: "8px" }}>
        <p>Next.js + TypeScript + Vercel = 🚀</p>
      </div>
      <Link href="/login" style={{
        marginTop: "2rem",
        padding: "12px 24px",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "8px",
        color: "#fff",
        textDecoration: "none",
        fontWeight: 500,
        transition: "background 0.2s",
      }}>
        Go to Login →
      </Link>
    </main>
  );
}
