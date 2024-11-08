import ArticulosConFoto from '@/components/gestionContenido/ArticulosConFoto';
import PR_Filtro from '@/components/gestionContenido/filtros/PR_Filtro';
import React from 'react'

const articulos = [
    {
        id: 1,
        titulo: 'Título del Artículo 1 ',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nulla, lectus feugiat tristique per dui erat nullam posuere conubia, interdum parturient tempor quam aliquet dictumst cubilia. Iaculis risus quisque duis fusce sem vestibulum odio, penatibus nibh euismod dictum sodales porta laoreet, class orci venenatis porttitor tortor curae. Aliquet faucibus volutpat laoreet parturient erat feugiat blandit habitant penatibus quisque lacus augue nascetur proin primis, pretium nam accumsan gravida rhoncus ligula ac vivamus arcu quis eu praesent massa risus.',
        link: '/articulo/1',
        imagen: 'https://via.placeholder.com/100', // Usa una imagen de prueba
    },
    {
        id: 2,
        titulo: 'Título del Artículo 2',
        descripcion: 'Descripción del Artículo 2Lorem ipsum dolor sit amet consectetur adipiscing elit nulla, lectus feugiat tristique per dui erat nullam posuere conubia, interdum parturient tempor quam aliquet dictumst cubilia. Iaculis risus quisque duis fusce sem vestibulum odio, penatibus nibh euismod dictum sodales porta laoreet, class orci venenatis porttitor tortor curae. Aliquet faucibus volutpat laoreet parturient erat feugiat blandit habitant penatibus quisque lacus augue nascetur proin primis, pretium nam accumsan gravida rhoncus ligula ac vivamus arcu quis eu praesent massa risus.',
        link: '/articulo/2',
        imagen: 'https://via.placeholder.com/100',
    },
    {
        id: 3,
        titulo: 'Título del Artículo 3',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nulla, lectus feugiat tristique per dui erat nullam posuere conubia, interdum parturient tempor quam aliquet dictumst cubilia. Iaculis risus quisque duis fusce sem vestibulum odio, penatibus nibh euismod dictum sodales porta laoreet, class orci venenatis porttitor tortor curae. Aliquet faucibus volutpat laoreet parturient erat feugiat blandit habitant penatibus quisque lacus augue nascetur proin primis, pretium nam accumsan gravida rhoncus ligula ac vivamus arcu quis eu praesent massa risus.',
        link: '/articulo/3',
        imagen: 'https://via.placeholder.com/100',
    },
];

const page = () => {
  return (
    <div>
        <h1 className='h1-bold txtcolor-primary txt-center' style={{ paddingTop: '13px' }}>Publi-Reportajes: Publicados</h1>
        <PR_Filtro />
        <ArticulosConFoto articulos={articulos} />
    </div>
  )
}

export default page