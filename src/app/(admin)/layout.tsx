import Dashboard from "../../components/dashboard/Dashboard";

export default function AdminLayout({
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