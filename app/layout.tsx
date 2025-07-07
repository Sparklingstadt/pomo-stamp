import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomo Stamp",
  description: "A nice pomodoro stamp app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
