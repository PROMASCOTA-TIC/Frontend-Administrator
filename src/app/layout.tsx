import "./globals.css";
import { generateMetadata } from "./metadata";

export const metadata = generateMetadata("My App", "My app description");

// Definición del componente RootLayout
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
