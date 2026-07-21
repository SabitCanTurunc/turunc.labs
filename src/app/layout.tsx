import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Arabic font — Cairo is a modern, high-quality Arabic web font
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`dark scroll-smooth ${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased h-full overflow-x-hidden max-w-full`}
    >
      <body className="bg-[#05080F] text-[#dbe2fd] overflow-x-hidden w-full max-w-full font-sans min-h-screen flex flex-col selection:bg-[#ff5625] selection:text-white">
        {children}
      </body>
    </html>
  );
}
