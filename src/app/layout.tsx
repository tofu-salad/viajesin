import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" data-theme="catppuccin-mocha">
            <head />
            <body className={` bg-base-200 text-neutral-300  h-screen`}>
                {children}
            </body>
        </html>
    );
}
