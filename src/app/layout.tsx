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
        <main className="flex items-center justify-center h-screen overflow-hidden bg-gradient-to-tr from-slate-100 to-orange-100">
          {children}
        </main>
      </body>
    </html>
  );
}
