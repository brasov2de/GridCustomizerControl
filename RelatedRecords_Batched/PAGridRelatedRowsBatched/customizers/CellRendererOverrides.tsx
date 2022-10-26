import * as React from 'react';
import { CellRendererProps, GetRendererParams, RECID } from '../PAGridTypes';
import { ActivityCounter } from './ActivityCounter';
import { RequestManager } from './requestManager';


const FETCH_TASKS = [`<fetch no-lock="true" aggregate="true" >`,
`<entity name="task">`,
  `<attribute name="activityid" alias="count" aggregate="count"/>`,
  `<attribute name="regardingobjectid" alias="parentid" groupby="true"/>`,
  `<filter>`,
    `<condition attribute="regardingobjectid" operator="in">`,
     "${IDS}",
    `</condition>`,
    `<condition attribute="statecode" operator="eq" value="0"/>`,
  `</filter>`,
`</entity>`,
`</fetch>`].join("");

export const generateCellRendererOverrides = (webAPI: ComponentFramework.WebApi) => {  
    const requestManagerActivities = new RequestManager(webAPI, "task", FETCH_TASKS, "parentid");
    return  {       
        ["Text"] : (props: CellRendererProps, rendererParams: GetRendererParams) => {                    
            const {columnIndex, colDefs, rowData } = rendererParams;         
            const columnName = colDefs[columnIndex].name;     
            if(columnName !== "address1_line3"){
                return null;
            }            
            const parentId = rowData?.[RECID];                      
            return <ActivityCounter parentId={parentId} requestManager={requestManagerActivities} cellRenderProps={props}/>
         }        
    }  
}