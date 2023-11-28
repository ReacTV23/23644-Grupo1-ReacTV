import React from "react";
import { useMediaType } from "../../context/mediaTypeProvider";
import Titulo from '../Titulo/Titulo'
import Checkbox from '../Checkbox/Checkbox'

const MediaSelector = () => {
  const { mediaType, changeMediaType } = useMediaType();

  const handleRadioChange = (event) => {
    const newType = event.target.value;
    changeMediaType(newType);
  };

  return (
    <div style={{width: '100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
      <Titulo texto={'Seleccione el tipo de medio'}/>
      <div style={{display: 'flex', alignItems: 'center', justifyContnent: 'center'}}>
        <Checkbox texto={'Películas (Movie)'} name={"mediaType"} value={'movie'} checked={mediaType === "movie"} onChange={handleRadioChange}/>
        <Checkbox texto={'Series (TV)'} name={"mediaType"} value={'tv'} checked={mediaType === "tv"} onChange={handleRadioChange}/>
        <Checkbox texto={'Todos (All)'} name={"mediaType"} value={'all'} checked={mediaType === "all"} onChange={handleRadioChange}/>
      </div>
    </div>
  );
};

export default MediaSelector;
