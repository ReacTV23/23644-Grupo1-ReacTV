import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
// import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
// import EventIcon from '@mui/icons-material/Event';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import { Card } from '../../Components/Card/Card'

const CardSinopsis = () => {

    // const movie1 = [
    //     {
    //     imgMovie: './Components/Card/assets/IMG.jpeg',
    //     titulo: 'Avengers - Endgame',
    //     descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt ut aut repellendus quidem eius corrupti similique eaque dolorem, deleniti voluptas dignissimos earum maxime laborum possimus nostrum. Maxime, aspernatur amet!',
    //     edad: '+14',
    //     duracion: '2H 3min',
    //     genero: 'Accion', 
    //     year: '1990'
    //     }]

    return (
        <LayoutSecundario>
            {/* {<Banner/>} Backdrop de la card en width 769px
            <Card/> poster titulo + subtitulo: genero + boton + sinopsis */}

            {/* movie1.map((card) => (
                const { imgMovie, titulo, descripcion, edad, duracion, genero, year } = card
                return (
                    <Card
                    imgMovie={imgMovie}
                    titulo={titulo}
                    year={year}
                    descripcion={descripcion}
                    edad={edad}
                    duracion={duracion}
                    genero={genero}
                    />
                ))) */}

            {/* <ButtonGroup className='GrupoBotones' aria-label="small button group">
                <Boton Contenido={PlaylistAddCircleIcon} agregar a Mi Lista/>
                <Boton Contenido={EventIcon} agregar a calendario/>
                <Boton Contenido={PlayCircleIcon} reproducir video: Visualizador/>
                <Boton Contenido={DownloadForOfflineIcon} descargar poster/>
            </ButtonGroup>  acciones*/} 
        </LayoutSecundario>
    )
}

export default CardSinopsis
