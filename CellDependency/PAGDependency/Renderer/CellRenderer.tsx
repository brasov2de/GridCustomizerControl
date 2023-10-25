/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from '../PAGTypes';
import { EventManager } from './EventManager';
import Amount from './Components/Amount';



export const generateCellRendererOverrides = () => {

    const eventManager = new EventManager("OnPlanChange");
    const planCache = new Map<string, string | null >();

    return  {       
        ["Integer"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {          
            const {columnIndex, colDefs, rowData } = rendererParams;  
            const columnName = colDefs[columnIndex].name;                                 
            if(columnName==="diana_amount") {
                const plan = (rowData as any)["diana_plan"] as string;                                       
                return <Amount value={props.value as number | null} plan={plan} eventManager={eventManager} rowId={rowData?.[RECID] as string} formattedValue={props.formattedValue}/>;
            }
        },
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
         
            const {columnIndex, colDefs, rowData } = rendererParams;  
            const columnName = colDefs[columnIndex].name; 
            if(columnName!=="diana_plan") return;
            const rowId = rowData?.[RECID];
            if(rowId===undefined) return;

            const oldValue = planCache.get(rowId);
            if(oldValue!=null && oldValue !== props.value){
                eventManager.publish(rowId, props.value);
            }
            planCache.set(rowId, props.value as string ?? null);

            return null;
        }

    }  
}
     

