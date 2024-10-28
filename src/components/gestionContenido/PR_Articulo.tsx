import { Box, Button } from '@mui/material'
import React from 'react'

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';
import Link from 'next/link';

const PR_Articulo = () => {
    return (
        <Box
            className='flex-column'
            sx={{
                gap: '21px'
            }}
        >
            <div style={{ display: 'flex' }}>
                <div className='flex-column txt-justify' style={{ width: '80%', gap: '21px', paddingRight: '34px' }}>
                    <h2 className='h2-semiBold txtcolor-secondary'>Titulo: Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla pulvinar, tristique dis donec vulputate et aptent magnis integer metus vehicula</h2>
                    <p className='n-regular'>Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla pulvinar, tristique dis donec vulputate et aptent magnis integer metus vehicula, penatibus tortor imperdiet ornare cursus erat fames fermentum. Litora torquent eu primis tempus montes tellus proin a, luctus non parturient laoreet sociis vel id. Vestibulum conubia himenaeos tincidunt leo volutpat dui sociis habitasse hendrerit, primis lobortis laoreet eget ac hac per aptent pulvinar et, ut curae cursus venenatis porttitor at commodo sed. Aliquet accumsan convallis parturient sociosqu phasellus rhoncus enim proin, eu sociis dictumst in rutrum morbi dignissim cras gravida, vestibulum viverra natoque inceptos tortor mus neque.
                        Id dapibus felis phasellus rutrum aenean sollicitudin mus neque, senectus interdum nascetur donec cras cum nostra, malesuada bibendum torquent etiam ullamcorper varius habitasse. Ultrices scelerisque auctor arcu morbi curabitur aenean luctus, porttitor nulla nibh turpis semper interdum aliquam, donec neque in quisque curae odio. Accumsan risus consequat molestie egestas morbi euismod auctor eros quis, faucibus magna pellentesque sed justo mi vehicula diam venenatis a, neque sodales porta hac fames nostra leo nisl. Feugiat integer potenti quisque habitasse hendrerit facilisis porttitor malesuada nullam, conubia proin venenatis dis urna nascetur habitant justo, fames fringilla suscipit scelerisque sed sodales tempus volutpat.
                        Euismod venenatis himenaeos id et cursus erat, aenean pulvinar varius auctor ligula, aliquet parturient iaculis cubilia ad. Magnis lectus pharetra imperdiet odio dignissim cras pellentesque nostra nibh gravida lacus molestie, ligula nec himenaeos commodo proin scelerisque consequat auctor nullam cum. Volutpat posuere leo cum urna eleifend facilisis ad nunc litora mauris est pretium inceptos sagittis, nibh vivamus venenatis platea habitant lobortis elementum eros pellentesque ullamcorper in vehicula.</p>
                </div>
                <img src="https://via.placeholder.com/100" className='articulo_imagen' />
            </div>
            <Box
                className='flex-column'
                sx={{
                    alignItems: 'center',
                    gap: '34px'
                }}
            >
                <p className='n-regular'><b>De venta en: </b>Hola</p>
                <div className="n-semiBold">
                    <p>
                        Para descubrir recursos útiles y consejos sobre el bienestar de tu mascota, explora nuestra sección de
                        <span className="txtcolor-secondary"> Enlaces de Interés.</span>
                    </p>
                </div>

            </Box>
        </Box>
    )
}

export default PR_Articulo