import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 44,
          background: "#060d20",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "16px",
          border: "2px solid rgba(255, 86, 37, 0.5)",
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", marginTop: "-4px" }}>
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
