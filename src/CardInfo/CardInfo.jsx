import React from "react";
import {pascalCase} from "pascal-case";


export default function CardInfo ({Country , City , Currency , Languages , population , Images}){

    return(
        <div className ='CardInfo'>
            <div className='ParentFlag'> {Images.includes(pascalCase(Country)) ?  <img className='Falg' src={Images}/> : <h1> Not Found Flag : {Country}</h1>}</div>
            <h2>City : {City}</h2>
            <h2>Currency : {Currency}</h2>
            <h2>Languages : {Languages}</h2>
            <h2>population : {population}</h2>
        </div>
    )


}