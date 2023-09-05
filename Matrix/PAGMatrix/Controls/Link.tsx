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
    color?: string;
    }

export const LinkControl = React.memo(function LinkControlRaw({rowId, requestManager,  value, formattedValue, onClick, name, url, navigate, color}: ILinkDisabledControlProps){    
  

    function startEditing(){
        if(onClick!=null){
            onClick();
        }    
    }
   
    return (<div className="dianamics_cell_container"  onClick={startEditing}>
        <div className="dianamics_cell">
            {color && <Icon iconName="CircleFill" style={{color: color}}/>}
            <a className="link_label" href={url} onClick={navigate}>{formattedValue}</a>&nbsp;           
        </div>
        </div>);
    
});