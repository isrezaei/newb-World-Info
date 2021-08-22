import React from "react";

export default function ChoiceLanguage ({LanCode , SelectLan , Options}){

    return(
        <form className='SelectLang'>
            <label>Select Your Language For Search</label>
            <select value={LanCode} onChange={SelectLan}>
                {Options}
            </select>
        </form>
    )

}