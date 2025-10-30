import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firebase Next.js App",
  description: "Next.js app with Firebase and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
