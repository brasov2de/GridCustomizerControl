import * as React from 'react';
import { RequestManager } from './requestManager';

interface IActivityCounterProps {
   parentId ?: string;  
   requestManager : RequestManager;
}
export const ActivityCounter = React.memo(function ActivityCounterRaw({parentId, requestManager}: IActivityCounterProps){    
    const [count, setCount] = React.useState<number>();
    React.useEffect(() => {
        if(!parentId){
            return;
        }
        requestManager.getRecords(parentId)
        .then((c) => {            
            setCount(c ?? 0);
        });
    },[parentId]);
   return <div>{count!=null ? count : "..."}</div>
});