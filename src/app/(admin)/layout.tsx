import Dashboard from "@/components/ui/dashboard/Dashboard";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Dashboard>
                {children}
            </Dashboard>
        </html>
    );
}