'use client';

import Sidebar from "@/components/ui/sidebar/Sidebar";
import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import MarginWidthWrapper from "@/components/ui/Margin-width-weapper";
import PageWrapper from "@/components/ui/Page-wrapper";


export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isOpen, setIsOpen] = useState(true);

    return (
                <Grid2 container spacing={1}>
                    <Grid2
                        size={{ xs: isOpen ? 1 : 0, sm: isOpen ? 2 : 0, md: isOpen ? 2 : 0 }}
                        sx={{ transition: "all 0.3s ease",
                            zIndex:5,
                        }}
                    >
                        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                    </Grid2>
                    <Grid2
                        size={{ xs: isOpen ? 11 : 12, sm: isOpen ? 10 : 12, md: isOpen ? 10 : 12 }}
                        sx={{ transition: "all 0.3s ease",
                            width: {
                                xs: "100%",
                                md: isOpen ? "calc(100% - 250px)" : "100%",
                            },
                            maxWidth: "100%",
                        }}
                        marginLeft={{ md: isOpen ? "250px" : "0" }}
                        >
                        <main>
                            <MarginWidthWrapper>
                                <PageWrapper>
                                    {children}
                                </PageWrapper>
                            </MarginWidthWrapper>
                        </main>
                    </Grid2>
                </Grid2>
    );
}