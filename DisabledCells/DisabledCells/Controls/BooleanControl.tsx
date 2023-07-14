import * as React from "react";
import { RequestManager } from "../Customizer/RequestManager";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { useIsDisabled } from "./useIsDisabled";

export interface IBooleanDisabledControlProps {
    name : string;
    rowId : string;  
    requestManager : RequestManager;   
    onLabel: string;
    offLabel: string;
    value : boolean | null |undefined;
    onClick ?: () => void;   
    }

export const BooleanControl = React.memo(function BooleanControlRaw({rowId, requestManager, onLabel, offLabel, value, onClick, name}: IBooleanDisabledControlProps){        
    const [isDisabled] = useIsDisabled(requestManager,rowId, name);    
    
    return (<div style={{    display: "inline-flex", alignItems: "center",  width: "100%",  "flexDirection": "column"}}>
        <Toggle disabled={isDisabled} checked={value || false} onText={onLabel} offText={offLabel} onClick={onClick}/>
        </div>);
    
});