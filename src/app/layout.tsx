import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lumerlabs.in"),

  title: "Lumer Labs | Growth and Creative Agency",

  description:
    "We are a creative digital agency building powerful brands, modern websites, and meaningful digital experiences.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Lumer Labs | Growth and Creative Agency",
    description:
      "Lumer Labs is a growth and creative agency specializing in AI solutions, web development, custom software, mobile apps, automation, SaaS development, UI/UX design, branding, and digital marketing.",
    url: "https://www.lumerlabs.in",
    siteName: "Lumer Labs",
    images: [
      {
        url: "https://www.lumerlabs.in/lumerlabs-png.png",
        width: 1200,
        height: 630,
        alt: "Lumer Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lumer Labs",
    url: "https://www.lumerlabs.in",
    logo: "https://www.lumerlabs.in/lumerlabs-png.png",
    description:
      "Lumer Labs is a growth and creative agency specializing in AI solutions, web development, branding, UI/UX, automation, SaaS development, and digital marketing.",
  };

  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-[#F5F5F7]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {children}

        <GoogleAnalytics gaId="G-LJ33N8PLG9" />
      </body>
    </html>
  );
}