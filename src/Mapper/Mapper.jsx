import React from "react";
import ImageMapper from 'react-image-mapper';
import Images from './Image/World Map.jpg'
import DataBase from './JsonData/package.json'


export default function Mapper({NameCountry}){
    return (
        <ImageMapper
            onClick={(E) => NameCountry(E.name)}
            src={Images}
            map={DataBase}
            width={1000}
            imgWidth={1000}/>
    )
}