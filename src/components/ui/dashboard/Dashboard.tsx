'use client';

import Sidebar from "@/components/ui/sidebar/Sidebar";
import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import MarginWidthWrapper from "../wrapper/Margin-width-wrapper";
import PageWrapper from "../wrapper/Page-wrapper";
import TopNavbar from "../top-navbar/TopNavbar";
import PieDePagina from "../footer/PieDePagina";

export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Grid2 container spacing={1} sx={{ minHeight: "100vh" }}>
            <TopNavbar />
            <Grid2 className="absolute"
                size={{ xs: isOpen ? 1 : 0, sm: isOpen ? 2 : 0, md: isOpen ? 2 : 0 }}
                maxWidth={isOpen ? "250px" : "0px"}
            >
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </Grid2>
            <Grid2
                size={{ xs: 12, md: isOpen ? 10 : 12 }}
                sx={{ transition: "all 0.3s ease" }}
                maxWidth={{ md: isOpen ? "calc(100% - 250px)" : "100%" }}
                marginLeft={{ md: isOpen ? "250px" : "0px" }}
            >
                <main>
                    <MarginWidthWrapper>
                        <PageWrapper>
                            {children}
                        </PageWrapper>
                    </MarginWidthWrapper>
                </main>
            </Grid2>
            <PieDePagina isOpen={isOpen} />
        </Grid2>
    );
}