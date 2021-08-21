import React ,{useState , useEffect} from "react";
import { pascalCase } from "pascal-case";
import Service from "../Service/Service";
import Mapper from "../Mapper/Mapper";



export default function Master(){

    const [Country , SetCountry] = useState('iran')
    const [Summary , SetSummary] = useState('')
    const [FlagImage , SetFlagImage] = useState('')
    const [Info , SetInfo] = useState('')
    const [Boolean , SetBoolean] = useState(false)
    const [Api , SetApi] = useState()
    const [language , Setlanguage]=useState({
        Lan : ['en' , 'fa' , 'fr' , 'de' , 'ar']
    })
    const [LanCode , SetLanCode] =useState('en')


    useEffect(()=>{

        async function SetData(){

          let WikiJs = await Service(Country , LanCode)
            const [summary , info , image] = await Promise.all([
                WikiJs.summary(),
                WikiJs.info(),
                WikiJs.images(),
            ])

            const Country_Flag = info.imageFlag.replace(/\s/g , '_')



            SetApi(WikiJs)
            SetInfo(info)
            SetSummary(summary)
            SetBoolean(false)

            image.some((value) => {
                if (value.includes(Country_Flag)){
                   return SetFlagImage(value)
                }
            })



        }
        SetData()






    },[Country , LanCode])



    const GetNameCountry = (Name) => {
        console.log(Name)
        return(
            SetCountry(Name),
                SetBoolean(true)
        )
    }

    const Options = language.Lan.map(value => {
        return <option>{value}</option>
    })

    const SelectLanguage = (E) =>{
        return(
            SetLanCode(E.target.value),
        SetBoolean(true)
        )
    }

    console.log(Api)
    console.log(language)


    if (Summary){
        return (
            <>
                {
                    !Boolean ?
                        <>
                            <form>
                                <select onChange={SelectLanguage}>
                                    {Options}
                                </select>
                            </form>
                            <Mapper NameCountry={GetNameCountry}/>
                            <h1>{Info.commonName}</h1>
                            {FlagImage.includes(pascalCase(Country)) ?  <img src={FlagImage}/> : <h1> Not Found Flag : {Country}</h1>}
                            <h4>{Summary}</h4>
                        </>
                        : <h1>Loading >>> </h1>
                }
            </>
        )
    }else {
        return <h1>Please Wait</h1>
    }
}





