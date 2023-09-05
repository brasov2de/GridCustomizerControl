import * as React from "react";
import { RequestManager } from "../Customizer/RequestManager";
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Label } from "@fluentui/react/lib/Label";


export interface IMatrixCellProps {    
    parentId : string;    
    year : string;
    opportunityId ?: string;    
    requestManager : RequestManager | null;   
    onClick ?: () => void;    
    isReadOnly ?: boolean;
    }

export const MatrixCellControl = React.memo(function MatrixCellControlRaw({parentId, year, opportunityId, requestManager, onClick, isReadOnly}: IMatrixCellProps){  
    const [entity, setEntity] = React.useState<any | undefined>(requestManager?.getCached(parentId, undefined, year)); 
    const [cellId, setCellId] = React.useState<string | undefined>(entity?.diana_requestpositionscenarioyearid);
    const [value, setValue] = React.useState<string | undefined>(entity?.diana_value);
    const mounted = React.useRef(false);
    const title = `Year ${year}`;

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;        
        };
    }, []);

    React.useEffect(() => {
        if(!parentId || !requestManager){
            return;
        }   
        if(value != undefined) {return; }
        if(!requestManager.hasOpportunityId()){
            requestManager.setOpportunityId((opportunityId as any)?.id?.guid);
        }
        requestManager?.getRecords(parentId, cellId, year)
        .then((entity) => {              
            if(mounted.current){
                setCellId(entity?.diana_requestpositionscenarioyearid);               
                setValue(entity?.diana_value ?? "");
            }
        });
    
    },[parentId, year, opportunityId]);  
    
    /*
    function startEditing(){
        if(onClick!=null){
            onClick();
        }    
    }*/

    const upsertValue = (event: any) => {  
       const newValue = event?.target?.value;      
      // setValue(newValue);
       requestManager?.upsertRecord( cellId, parentId, year, newValue ?? "0")       
    }

  /*  const noBubbling = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key);
        if(event.key === "Enter" || event.key === "Escape"){                    
            event.stopPropagation();            
        }
        }*/
    function onClickHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>){
       if(onClick) onClick();      
    }
   
    return (<div className="dianamics_cell_container" onClick={onClickHandler}>            
        {isReadOnly 
        ? <Label className="dianamics_cell_number">{value}</Label> 
        : <input type="number" defaultValue={value} title={title} onChange={upsertValue}  style={{textAlign: "right"}} autoFocus  onFocus={e => e.currentTarget.select()}/>
        }
        </div>);
    
});