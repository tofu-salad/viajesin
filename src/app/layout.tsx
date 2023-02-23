import { Inter } from "@next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="catppuccin-mocha">
      <head />
      <body
        className={`${inter.className} bg-base-200 text-neutral-300  h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
