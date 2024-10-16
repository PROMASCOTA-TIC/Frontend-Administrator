import "./globals.css";
import Dashboard from "./(admin)/dashboard/Dashboard";
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
        <Dashboard>
          {children}
        </Dashboard>
      </body>
    </html>
  );
}
