import React from 'react';
import Boton from '../../Boton';
import Titulo from '../../Titulo/Titulo';
import CardImg from '../../Card/CardImg/CardImg'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const RenderItems = ({ items, itemsPaginado, type, setItemsFunction, handleDelete, navigate,  ITEMS_PER_PAGE, paginate }) => {

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1rem' }}>
            <Titulo texto={`${type}`} />
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem' }}>
                {items.map((item) => (
                    <div style={{ width: '200px', margin: '0.5rem', position: 'relative' }} key={item.id}>
                        <div style={{ width: '100%', position: 'relative' }}>
                            <CardImg peli={item} width={200} height={300} funcion={() => navigate(`/card/movie/${item.id}`)} />
                        </div>
                        <div style={{ position: 'absolute', top: '-25px', right: '-20px' }}>
                            <Boton
                                Contenido={DeleteForeverIcon}
                                fontSize={'30px'}
                                height={'40px'}
                                ccolor={'white'}
                                backgroundColor={'#003686'}
                                backgroundHover={'#E08400'}
                                funcion={() => handleDelete(item.id, type, setItemsFunction)}/>
                        </div>
                    </div>
                ))}
            </div>
            {/* Paginación */}
            {itemsPaginado.length > ITEMS_PER_PAGE && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {Array.from({ length: Math.ceil(itemsPaginado.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
                        <Boton
                            texto={page}
                            funcion={() => paginate(page)}
                            key={page}
                            width={'30px'}
                            color={'white'}
                            backgroundColor={'#003686'}
                            backgroundHover={'#E08400'}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RenderItems;