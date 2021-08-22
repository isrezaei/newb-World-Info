import React ,{useState , useReducer , useEffect} from "react";
import Service from "../Service/Service";
import Mapper from "../Mapper/Mapper";
import CardInfo from "../CardInfo/CardInfo";
import ChoiceLanguage from "../ChoiesLanguage/ChoiceLanguage";
import SummaryInfo from "../Summary/SummaryInfo";
import Loader from '../Loading/Radio.gif'
import '../Style/Style.css'


const initState = {
    Summary : '',
    Info : '',
    Language :{
        Lan : ['en' , 'fa']
    },
}

function Reducer(State , Action){
    return{
        ...State,
        Summary : Action.SetSummary,
        Info : Action.SetInfo,
    }
}


export default function Master(){

    const [State , Dispatch] = useReducer(Reducer , initState)

    const [Country , SetCountry] = useState('iran')
    const [FlagImage , SetFlagImage] = useState('iran')
    const [Boolean , SetBoolean] = useState(false)
    const [LanCode , SetLanCode] =useState('en')



    useEffect(()=>{

        async function SetData(){

            //Get & Set Data Api
            let WikiJs = await Service(Country , LanCode)
            const [summary , info , image] = await Promise.all([
                WikiJs.summary(),
                WikiJs.info(),
                WikiJs.images(),
            ])

            //Change SynTax , Add (_) To Name Country Api
            const Country_Flag = info.imageFlag.replace(/\s/g , '_')

            //Set States ...
            Dispatch({
                SetInfo : info,
                SetSummary : summary
            })
            SetBoolean(false)

            //Loop In All Link Image Of API
            image.some((value) => {
                if (value.includes(Country_Flag)){
                    return SetFlagImage(value)
                }
            })

        }
        SetData()

    },[Country , LanCode])



    //Get World Map CountryName
    const GetNameCountry = (Name) => {
        console.log(Name)
        return(
            SetCountry(Name),
            SetBoolean(true)
        )
    }


    //Map For Select Language
    const Options = State.Language.Lan.map((value , Index) => {
        return <option key={Index}>{value}</option>
    })


    // Get Options Language Target Value
    const SelectLanguage = (E) =>{
        return(
            //Set States ...
            SetLanCode(E.target.value),
            SetBoolean(true)
        )
    }





    return (
        <>
            {
                !Boolean && State.Summary ?
                    <>
                        <ChoiceLanguage LanCode={LanCode} SelectLan={SelectLanguage} Options={Options}/>
                        <div className={'HeaderMap'}>
                            <Mapper NameCountry={GetNameCountry}/>
                            <CardInfo
                                Country={Country}
                                City={State.Info.capital}
                                Currency={State.Info.currency}
                                Images={FlagImage}
                                Languages={State.Info.officialLanguages}
                                population={State.Info.populationEstimate}
                            />
                        </div>
                        <SummaryInfo LanName={State.Info.conventionalLongName} Summary={State.Summary}/>
                    </>
                    : <div className='Loader'> <img src={Loader}/> </div>
            }
        </>
    )
}





