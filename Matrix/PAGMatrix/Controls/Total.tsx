import * as React from "react";
import { RequestManager } from "../Customizer/RequestManager";
import { Icon } from "@fluentui/react/lib/Icon";
import { useIsDisabled } from "./useIsDisabled";
import { Label } from "@fluentui/react/lib/Label";

export interface ITotalCellProps  {    
    parentId : string;       
    opportunityId ?: string;    
    requestManager : RequestManager | null;      
    }

export const TotalCell = React.memo(function TotalCellRaw({parentId, opportunityId, requestManager}: ITotalCellProps){      
    const [value, setValue] = React.useState<number | string | undefined>(undefined);
    const mounted = React.useRef(false);   
  
    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;                  
        };
    }, []);

    const handleSumChanged = (id:string) => {                
        if(id != parentId){
            return;
        }
        requestManager?.getSumByParent(parentId)
        .then((sum: any) => {              
            if(mounted.current){
                setValue(sum);
            }
        });
    };

    React.useEffect(() => {      
       
        if(requestManager){            
            requestManager.addEventListener("onSumChanged" , handleSumChanged );            
        }     
        return () => {           
            requestManager?.removeEventListener("onSumChanged" , handleSumChanged );
        };
    }, []);

  /*  React.useEffect(() => {
        if(!parentId || !requestManager){
            return;
        }   
        if(!requestManager.hasOpportunityId()){
            requestManager.setOpportunityId((opportunityId as any)?.id?.guid);
        }
        requestManager?.getSumByParent(parentId)
        .then((sum: any) => {              
            if(mounted.current){
                setValue(sum);
            }
        });
    
    },[parentId, opportunityId]);  */
    
    /*
    function startEditing(){
        if(onClick!=null){
            onClick();
        }    
    }*/

   
    return (<div className="dianamics_cell_container">
        <Label className="dianamics_cell_number">{value}</Label>
        </div>);
    
});