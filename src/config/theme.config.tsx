import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

export enum themePalette {
    FONT_GLOBAL = 'Work Sans, sans-serif',
    primary = '#004040',
    primarydos = '#00404099',
    secondary = '#00AA28',
    secondary40 = '#00AA2866',
    terciary = '#46DA69',
    terciary20 = '#46DA6933',
    quarternary = '#002828',
    quarternary40 = '#00282866',
    quintenary = '#006060',
    quinary50 = '#00606080',
    black = '#000000',
    black10 = '#0000001A',
    cwhite = '#FFFFFF',
}

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
        palette: {
            primary: {
                main: themePalette.primary,
            },
            secondary: {
                main: themePalette.secondary,
            },
        },
        typography: {
            fontFamily: themePalette.FONT_GLOBAL,
            h1: {
                fontSize: '36px',
                fontWeight: 'bold',
            },
            h2: {
                fontSize: '24px',
                fontWeight: 'bold',
            },
            h3: {
                fontSize: '18px',
                fontWeight: 'bold',
            },
            h4: {
                fontSize: '14px',
                fontWeight: 'bold',
            },
            h5: {
                fontSize: '12px',
                fontWeight: 'bold',
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    style: {
                        textTransform: 'none',
                    },
                },
            },
        },
    });

const ThemeConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeConfig;
