import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Miss Cathy Platform",
  description: "Personal AI chief-of-staff OS for web and Android."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
