/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from './PAGridTypes';
import { IInputs } from './generated/ManifestTypes';
import { NextAppointment } from './NextAppointment';
import { EventManager } from './EventManager';



export const generateCellRendererOverrides = (context: ComponentFramework.Context<IInputs>, eventManager: EventManager) => {

    const cachedNextAppointment = new Map<string, Date | null>();

    const nextAppointmentCell = (props: CellRendererProps, rendererParams: GetRendererParams) => {                      
        const { value , formattedValue, } = props;    
        const {columnIndex, colDefs, rowData } = rendererParams;
        const columnName = colDefs[columnIndex].name; 
        const rowId = rowData?.[RECID];  
        const scheduledDate = (rowData as any)["crec8_scheduleddate"] ? new Date((rowData as any)["crec8_scheduleddate"]) : null;
        console.log(`columnName ${columnName} rowId ${rowId} scheduledDate ${scheduledDate} `, rowData);

        if(columnName === "crec8_scheduleddate" && rowId != null){            
            const oldValue = cachedNextAppointment.get(rowId);
            if(oldValue!=null && oldValue?.valueOf() !== scheduledDate?.valueOf()){
                console.log("triggering onChange for ", rowId)
                eventManager.nextAppointmentChanged(rowId, scheduledDate);
            }
            cachedNextAppointment.set(rowId , scheduledDate);
            return null;
        }

        if(columnName !== "crec8_nextappointment" || rowData == null){
            return null;
        }
       
        return <NextAppointment scheduledDate={scheduledDate} eventManager={eventManager} context={context} rowId={rowData?.[RECID]}/>     
    };

    return  {       
        ["DateOnly"]: nextAppointmentCell, 
        ["DateAndTime"]: nextAppointmentCell
    }  
}
     

