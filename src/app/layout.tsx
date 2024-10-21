import "./globals.css";
import { generateMetadata } from "./metadata";

export const metadata = generateMetadata("My App", "My app description");

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
