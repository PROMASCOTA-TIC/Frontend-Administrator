// Data derived from https://gs.statcounter.com/os-market-share/desktop/worldwide/2023
// And https://gs.statcounter.com/os-market-share/mobile/worldwide/2023
// And https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/2023
// For the month of December 2023

export const datosMovimientos = [
    {
        label: 'Ropa',
        value: 50,
    },
    {
        label: 'Alimento',
        value: 20.85,
    },
    {
        label: 'Medicina',
        value: 20.5,
    },
    {
        label: 'Otros',
        value: 4.65,
    },
];

const normalize = (v: number, v2: number) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
    ...datosMovimientos.map((v) => ({
        ...v,
        label: v.label === 'Otros' ? 'Otros' : v.label,
        value: normalize(v.value, 50.1),
    })),
];

export const valueFormatter = (item: { value: number }) => `${item.value}%`;
