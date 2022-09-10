/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams } from './PAGridTypes';
import { IInputs } from './generated/ManifestTypes';

function nextMonday(date: Date): Date {
    var result = new Date(date);
    result.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
    return result;
}

export const generateCellRendererOverrides = (context: ComponentFramework.Context<IInputs>) => {
    const nextAppointmentCell = (props: CellRendererProps, rendererParams: GetRendererParams) => {                      
        const { value , formattedValue, } = props;    
        const {columnIndex, colDefs, rowData } = rendererParams;
        const columnName = colDefs[columnIndex].name;     
        if(columnName !== "crec8_nextappointment"){
            return null;
        }
        const scheduledDate = (rowData as any)["crec8_scheduleddate"];
        if(scheduledDate==null){
            return null;
        }
        const nextDate = new Date(scheduledDate);
        const isOverdue = nextDate.valueOf() < new Date().setHours(0,0,0,0);
        const changedValue = isOverdue ? nextMonday(new Date()) : nextDate;
        return (<label className="ORBIS.PAGCalculatedColumns"><div className={scheduledDate == null ? "" : isOverdue ? "overdue" : "regular"}>
            {context.formatting.formatDateShort(changedValue)}
            </div></label>
            )             
    };

    return  {       
        ["DateOnly"]: nextAppointmentCell, 
        ["DateAndTime"]: nextAppointmentCell
    }  
}
     

