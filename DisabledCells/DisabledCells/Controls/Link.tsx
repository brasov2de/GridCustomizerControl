import * as React from "react";
import { RequestManager } from "../Customizer/RequestManager";
import { Icon } from "@fluentui/react/lib/Icon";
import { useIsDisabled } from "./useIsDisabled";

export interface ILinkDisabledControlProps {
    name : string;
    rowId : string;  
    requestManager : RequestManager | null;   
    value : string | null |undefined;
    formattedValue: string;
    url ?: string;
    onClick ?: () => void; 
    navigate ?: () => void;  
    }

export const LinkControl = React.memo(function LinkControlRaw({rowId, requestManager,  value, formattedValue, onClick, name, url, navigate}: ILinkDisabledControlProps){    
    const [isDisabled] = useIsDisabled(requestManager,rowId, name);      

    function startEditing(){
        if(isDisabled==false&& onClick!=null){
            onClick();
        }    
    }
   
    return (<div className={isDisabled ? "dianamics_cell_container_disabled" : "dianamics_cell_container"}  onClick={startEditing}>
        <div className="dianamics_cell">
            <a className="link_label" href={url} onClick={navigate}>{formattedValue}</a>&nbsp;
            {isDisabled && <Icon iconName="Uneditable" />}
        </div>
        </div>);
    
});