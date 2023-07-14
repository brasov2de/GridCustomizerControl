import * as React from "react";
import { RequestManager } from "../Customizer/RequestManager";
import { Icon } from "@fluentui/react/lib/Icon";
import { useIsDisabled } from "./useIsDisabled";

export interface ITextDisabledControlProps {
    name : string;
    rowId : string;  
    requestManager : RequestManager | null;   
    value : string | null |undefined;
    formattedValue: string
    onClick ?: () => void;   
    }

export const TextControl = React.memo(function TextControlRaw({rowId, requestManager,  value, formattedValue, onClick, name}: ITextDisabledControlProps){    
    const [isDisabled] = useIsDisabled(requestManager,rowId, name);      

    function startEditing(){
        if(isDisabled==false&& onClick!=null){
            onClick();
        }    
    }
   
    return (<div className={isDisabled ? "dianamics_cell_container_disabled" : "dianamics_cell_container"}  onClick={startEditing}>
        <div className="dianamics_cell">
            <span className="text_label">{formattedValue}</span>&nbsp;
            {isDisabled && <Icon iconName="Uneditable" />}
        </div>
        </div>);
    
});