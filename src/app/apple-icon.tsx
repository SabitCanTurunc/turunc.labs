import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: "#060d20",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "40px",
          border: "4px solid rgba(255, 86, 37, 0.6)",
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", marginTop: "-10px" }}>
          <span>t</span>
          <span style={{ color: "#ff5625" }}>.</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
