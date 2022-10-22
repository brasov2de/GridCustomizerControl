import * as React from 'react';
import { CellRendererProps, GetRendererParams, RECID } from '../PAGridTypes';
import { ActivityCounter } from './ActivityCounter';
import { RequestManager } from './requestManager';




export const generateCellRendererOverrides = (webAPI: ComponentFramework.WebApi, requestManager: RequestManager) => {  
 
    return  {       
        ["Text"] : (props: CellRendererProps, rendererParams: GetRendererParams) => {                    
            const {columnIndex, colDefs, rowData } = rendererParams;         
            const columnName = colDefs[columnIndex].name;     
            if(columnName !== "address1_line3"){
                return null;
            }            
            const parentId = rowData?.[RECID];                      
            return <ActivityCounter parentId={parentId} requestManager={requestManager}/>
         }        
    }  
}