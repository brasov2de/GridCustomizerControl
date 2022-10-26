import { Icon } from '@fluentui/react/lib/components/Icon';
import * as React from 'react';
import { CellRendererProps } from '../PAGridTypes';
import { RequestManager } from './requestManager';

interface IActivityCounterProps {
   parentId ?: string;  
   requestManager : RequestManager;   
    cellRenderProps : CellRendererProps;
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
        formId : "b8c2f260-36e8-4439-bdaa-47dd4a7593db",
        tabName: "tab_activities"
     /*   relationship: {
            attributeName: "regardingobjectid",
            name: "Account_ActivityPointers", 
            navigationPropertyName: "regardingobjectid_account",
            relationshipType: 0, //OneToMany
            roleType: 1 //Referencing
        }*/
        }); 
}

export const ActivityCounter = React.memo(function ActivityCounterRaw({parentId, requestManager, cellRenderProps}: IActivityCounterProps){    
    const [count, setCount] = React.useState<number>();
    const [isDirty, setIsDirty] = React.useState<boolean>(false);
    const mounted = React.useRef(false);

    const onClick = React.useCallback(() => {      
        if(parentId){
            console.log("clicked on parentId", parentId);
            openSidePane(parentId);  
            requestManager.addToRefreshList(parentId);   
            setIsDirty(true);            
        }
    }, [parentId, isDirty]);

    const refresh = () => {
        if(parentId){           
        requestManager.refresh(parentId).then((result) => {
            if(mounted.current){
                setIsDirty(false)
                setCount(result);
            }
        });
        }
    }

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        //    console.log(`People component unmounted for ${parentId}`);
        };
    }, []);
    React.useEffect(() => {
        if(!parentId){
            return;
        }
        console.log(`%cStarting getRecords for ${parentId}`, "color:yellow");    
        requestManager.getRecords(parentId)
        .then((c) => {   
            console.log(`%c Component got response for ${parentId}: ${c}`, "color:green");         
            if(mounted.current){
                setCount(c ?? 0);
            }
        });
    },[parentId]);   
   
    const refreshIcon = isDirty ? <Icon iconName="Refresh" onClick={refresh} /> : null;

    return <div>
        <div 
            onClick={onClick}
            style={{height: "28px", width:"28px", display: "inline-block", backgroundColor: (count===0 || count ==null) ? "transparent" : "#5B2C6F", border: count===0 ? "1px solid white" : "1px solid #5B2C6F", color:"white", textAlign: "center", borderRadius: "15px", margin: "1px", lineHeight: "25px", cursor: 'pointer'}} 
            >{count==null ? "..." : count}
            </div>
        {refreshIcon}
        </div>
});