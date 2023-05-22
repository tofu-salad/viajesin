import { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";

export const metadata: Metadata = {
  title: "Viajesin",
  description: "Aplicación Web para tú diario de viajes.",
};
 const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="es">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
