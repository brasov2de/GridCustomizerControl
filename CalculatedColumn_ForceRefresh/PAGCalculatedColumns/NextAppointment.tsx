import * as React from 'react';
import { IInputs } from './generated/ManifestTypes';
import { EventManager } from './EventManager';

export interface INextAppointmentProps {
    scheduledDate: Date | null;    
    rowId: string;
    eventManager: EventManager;
    context: ComponentFramework.Context<IInputs>;
}

function nextMonday(date: Date): Date {
    var result = new Date(date);
    result.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
    return result;
}

export const NextAppointment = React.memo(function NextAppointmentRaw({rowId, scheduledDate, eventManager, context}: INextAppointmentProps){
    const [value, setValue] = React.useState<Date | null>(scheduledDate); 
    const mounted = React.useRef(false);
    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;        
        };
    }, []);

    const onScheduledDateChanged = (evt: any) => {        
        const detail = evt.detail;
        if(detail.rowId === rowId){
            setValue(detail.value);
        }
    };

    React.useEffect(() => {
        if(!mounted.current){
            return;
        }      
        eventManager.addOnAppointementChanged(onScheduledDateChanged);
        () => {
            eventManager.removeOnAppointementChanged(onScheduledDateChanged);
        }
    }, [rowId]);

    if(value==null){
        return <></>; //with null, I wouldn't have the control to render again when something changes
    }    
    const isOverdue = value?.valueOf() < new Date().setHours(0,0,0,0);
    const changedValue = isOverdue ? nextMonday(new Date()) : value;
    return (<label className="ORBIS.PAGCalculatedColumns">
        <div className={scheduledDate == null ? "" : isOverdue ? "overdue" : "regular"}>
        {context.formatting.formatDateShort(changedValue)}
        </div>
        </label>
        )      
});