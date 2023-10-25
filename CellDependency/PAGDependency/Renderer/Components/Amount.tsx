import  * as React from 'react';
import {Label} from "@fluentui/react/lib/Label";
import { EventManager } from '../EventManager';

interface IAmountProps {
    value ?: number |null;
    formattedValue ?: string;
    plan ?: string;
    rowId : string;
    eventManager: EventManager;
}

const rules = new Map<string, any>(Object.entries({
    //Plan A
    "341560000" : (value: number) => value > 10000 ? "red" : "green",
    //Plan B
    "341560001" : (value: number) => value > 100000 ? "orange" : "green"
    })
);

const Amount: React.FC<IAmountProps> = ({ value, plan, rowId , formattedValue, eventManager}: IAmountProps) => {
    const [currentPlan, setCurrentPlan] = React.useState(plan);
    const mounted = React.useRef(false); 
    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;        
        };
    }, []);
    
    const onChanged = (evt: any) => {        
        const detail = evt.detail;
        if(!mounted.current) return;
        if(detail.rowId === rowId){
            setCurrentPlan(detail.value);
        }
    };
    
    React.useEffect( () => {
        if(!mounted.current){
            return;
        }         
        eventManager.subscribe(onChanged);
        return () => { eventManager.unsubscribe(onChanged);}
    }, [rowId]);

    const colorFn = currentPlan ? rules.get(currentPlan) : undefined;
    return <Label style={{color: colorFn ? colorFn(value) : "black"}}>{formattedValue}</Label>
};

export default Amount;
