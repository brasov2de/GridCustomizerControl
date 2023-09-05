import * as React from "react";
import { RequestManager } from "../Customizer/RequestManager";

export const useIsDisabled = (requestManager: RequestManager | null, rowId: string, columnName : string) => {
    const initialDisabled = requestManager?.getCached(rowId, "2021")?.[columnName];
    const [isDisabled, setIsDisabled] = React.useState<boolean>(initialDisabled ?? true);   
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;        
        };
    }, []);

    React.useEffect(() => {
        if(!rowId){
            return;
        }   
        if(initialDisabled ==null){      
            requestManager?.getRecords(rowId, "2021")
            .then((c) => {              
                if(mounted.current){
                    setIsDisabled(c[columnName]);
                  //  setIsSolved(true);
                }
            });
        }
    },[rowId, columnName]);  

    return [isDisabled];
}