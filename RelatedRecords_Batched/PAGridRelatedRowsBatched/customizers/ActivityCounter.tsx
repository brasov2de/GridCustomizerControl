import * as React from 'react';
import { RequestManager } from './requestManager';

interface IActivityCounterProps {
   parentId ?: string;  
   requestManager : RequestManager;
}

const openSidePane = async (parentId: string) => {
    const paneConfig = {
        title: "Related Activities",
        imageSrc: "WebResources/sample_reservation_icon",
        paneId: "PAGRelatedActivitiesPane",
        canClose: true, 
        width: 600
    };
    // eslint-disable-next-line no-undef
    const pane1 = Xrm.App.sidePanes.getPane("PAGRelatedActivitiesPane") ?? await Xrm.App.sidePanes.createPane(paneConfig); 
     
     pane1.navigate({
        pageType: "entityrecord",
        entityName: "account",  
        entityId: parentId, 
        //tabName: "tab_5"
        relationship: {
            attributeName: "regardingobjectid",
            name: "Account_ActivityPointers", 
            navigationPropertyName: "regardingobjectid_account",
            relationshipType: 0, //OneToMany
            roleType: 1 //Referencing
        }
        }); 
}

export const ActivityCounter = React.memo(function ActivityCounterRaw({parentId, requestManager}: IActivityCounterProps){    
    const [count, setCount] = React.useState<number>();
    const mounted = React.useRef(false);

    const onClick = React.useCallback(() => {
        openSidePane(parentId);              
    }, []);

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
            console.log(`People component unmounted for ${parentId}`);
        };
    }, []);
    React.useEffect(() => {
        if(!parentId){
            return;
        }
        console.log(`%cStarting getRecords for ${parentId}`, "color:yellow");    
        requestManager.getRecords(parentId)
        .then((c) => {            
            if(mounted.current){
                setCount(c ?? 0);
            }
        });
    },[parentId]);   
    if(count==null){
        return <div>...</div>
    }
    if(count===0){
        return <></>
    }
    return <div 
        onClick={onClick}
        style={{height: "32px", width:"32px", backgroundColor: "#5B2C6F", color:"white", textAlign: "center", borderRadius: "15px", margin: "1px", lineHeight: "30px", cursor: 'pointer'}} 
        >{count}</div>
});