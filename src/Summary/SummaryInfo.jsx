import React from "react";


export default function SummaryInfo ({LanName , Summary}){
    return(
        <div className ='Summary'>
            <h1>{LanName}</h1>
            <h4>{Summary}</h4>
        </div>
    )
}