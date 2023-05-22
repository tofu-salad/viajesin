import { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";

export const metadata: Metadata = {
  title: "Viajesin",
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
    <html className={quicksand.className} lang="es">
      <body className="">{children}</body>
    </html>
  );
}
