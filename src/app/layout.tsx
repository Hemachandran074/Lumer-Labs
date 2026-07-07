import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumer Labs | Growth and Creative Agency",
  description: "We are a creative digital agency building powerful brands, modern websites, and meaningful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-[#F5F5F7]">
        {children}
      </body>
    </html>
  );
}
