import React from "react";
import wiki from 'wikijs';
let FetchError = require("fetch-error")


export default async function Service (Country  , Code){

    const Get =  wiki({ apiUrl: `https://${Code}.wikipedia.org/w/api.php` }).page(Country)

    const SendData = await fetch(Get)
        if (SendData.status === 200){
            return Get
        }
        if (SendData.status === 304 ){
            return SendData.status
        }

    return SendData

}