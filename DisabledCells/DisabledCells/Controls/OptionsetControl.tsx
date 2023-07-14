import * as React from "react";
import { RequestManager } from "../Customizer/RequestManager";
import { Icon } from "@fluentui/react/lib/Icon";
import { useIsDisabled } from "./useIsDisabled";

export interface IOptionSetDisabledControlProps {
    name : string;
    rowId : string;  
    requestManager : RequestManager | null;   
    dropDownOptions: [{key: string, text: string, data: {color: string}}]
    value : number | string | null |undefined;
    formattedValue: string
    onClick ?: () => void;   
    }

export const OptionSetControl = React.memo(function OptionSetControlRaw({rowId, requestManager,  value, formattedValue, onClick, dropDownOptions, name}: IOptionSetDisabledControlProps){    
    const [isDisabled] = useIsDisabled(requestManager,rowId, name);    
    const option = dropDownOptions.find((option: any) => option.key == value);

    function startEditing(){
        if(isDisabled==false&& onClick!=null){
            onClick();
        }    
    }
   
    return (<div className={isDisabled ? "dianamics_cell_container_disabled" : "dianamics_cell_container"}  onClick={startEditing}>
        <div className="dianamics_cell">
            <span className="optionset_label" style={{backgroundColor:option?.data?.color }}>{formattedValue}</span>&nbsp;
            {isDisabled && <Icon iconName="Uneditable" />}
        </div>
        </div>);
    
});