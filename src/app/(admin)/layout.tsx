import { Box } from "@mui/material";
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
                    <Box
                        height={50}
                    >
                        {/* <Header /> */}
                    </Box>
                    <Box
                        height={100}
                    >
                        {/* <Filtro /> */}
                    </Box>
                    {children}
                    <Box
                        height={20}
                    >
                        {/* <BtnDescargar /> */}
                    </Box>
                    <Box
                    height={100}
                    >
                        {/* <Footer /> */}
                    </Box>
                </Dashboard>

            </body>
        </html>
    );
}