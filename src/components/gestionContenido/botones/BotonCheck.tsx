import React from 'react'

const BotonCheck = () => {
    return (
        <Button
            variant="contained"
            onClick={handleOpenPositive}
            sx={{
                backgroundColor: green[500],  // Color verde del botón
                color: 'white',                // Color del ícono
                borderRadius: '8px',          // Bordes redondeados
                '&:hover': {
                    backgroundColor: green[700], // Color al pasar el mouse por encima
                },
                padding: '8px 12px',          // Ajusta el tamaño del botón
            }}
        >
            <Check />
        </Button>
    )
}

export default BotonCheck
