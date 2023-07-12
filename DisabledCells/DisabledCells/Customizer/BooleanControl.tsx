import * as React from "react";
import { RequestManager } from "./RequestManager";
import { Toggle } from "@fluentui/react";

export interface IBooleanDisabledControlProps {
    name : string;
    rowId ?: string;  
    requestManager : RequestManager;   
    onLabel: string;
    offLabel: string;
    value : boolean | null |undefined;
    onClick ?: () => void;
    }

export const BooleanDisabledControl = React.memo(function BooleanControlRaw({rowId, requestManager, onLabel, offLabel, value, onClick, name}: IBooleanDisabledControlProps){    
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true);    
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;        
        };
    }, []);

    React.useEffect(() => {
        if(!rowId){
            return;
        }         
        requestManager.getRecords(rowId)
        .then((c) => {              
            if(mounted.current){
                setIsDisabled(c[name]);
            }
        });
    },[rowId]);   
   

    return (<div style={{    display: "inline-flex", alignItems: "center",  width: "100%",  "flexDirection": "column"}}>
        <Toggle disabled={isDisabled} checked={value || false} onText={onLabel} offText={offLabel} onClick={onClick}/>
        </div>);
    
});