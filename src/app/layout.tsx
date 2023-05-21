import "./globals.css";

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
