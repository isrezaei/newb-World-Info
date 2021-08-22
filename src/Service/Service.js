import wiki from 'wikijs';

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