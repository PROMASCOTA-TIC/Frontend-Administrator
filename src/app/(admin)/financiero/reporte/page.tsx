import { LineChart } from '@mui/x-charts'
import React from 'react'

export default function Reporte() {
    return (
        <div style={{height: '400px'}}>
            <LineChart
                series={[
                    { curve: "linear", data: [0, 5000, 2000, 6000] },
                    { curve: "linear", data: [6000, 3000, 7000, 9500] },
                ]}
                xAxis={[{ data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], scaleType: 'band' }]}
            />
        </div>
    )
}