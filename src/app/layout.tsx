import "./globals.css";

export const metadata = {
  title: "Viajesin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head />
      <body className="">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
