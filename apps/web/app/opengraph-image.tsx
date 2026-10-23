import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// The picture shown when a link to the site is shared and the page has no better one.
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 90px",
        background: "linear-gradient(135deg, #0b7285 0%, #06344a 100%)",
        color: "white",
      }}
    >
      <svg width="260" height="130" viewBox="0 0 120 60" style={{ marginBottom: 20 }}>
        <path
          fill="#ffffff"
          d="M6 38C22 28 40 24 58 24L66 8C70 18 74 22 80 25C92 26 102 30 110 34L116 18C114 28 113 33 112 37L118 54C108 46 100 44 92 44C74 46 62 49 52 49L42 58L40 49C24 48 12 44 6 38Z"
        />
        <circle cx="21" cy="37" r="2.4" fill="#0b7285" />
      </svg>
      <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1 }}>{site.name}</div>
      <div style={{ fontSize: 44, marginTop: 24, opacity: 0.92, maxWidth: 900 }}>
        Meet a new shark every month.
      </div>
      <div style={{ fontSize: 32, marginTop: 14, opacity: 0.75 }}>
        Facts for curious kids and grown-ups
      </div>
    </div>,
    size,
  );
}
