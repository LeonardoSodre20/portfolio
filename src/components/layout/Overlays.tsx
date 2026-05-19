export function ScanlineOverlay() {
  return <div className="scanline-overlay" />;
}

export function CRTGrid() {
  return <div className="crt-grid" />;
}

export function AmbientBlobs() {
  return (
    <div className="ambient-blobs">
      <div
        className="ambient-blobs__blob"
        style={{
          top: "-20%", left: "-10%", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(191,0,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blobs__blob"
        style={{
          bottom: "-10%", right: "-5%", width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(255,0,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blobs__blob"
        style={{
          top: "40%", right: "10%", width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(0,255,255,0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
