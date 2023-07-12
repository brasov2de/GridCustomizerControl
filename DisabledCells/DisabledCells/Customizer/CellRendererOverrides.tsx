/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from './PAGridTypes';
import { RequestManager } from './RequestManager';
import { getIsAsyncDisabled } from './DisabledCellsList';

function renderDisabledCell(props: CellRendererProps, rendererParams: GetRendererParams, requestManager: RequestManager){    
    const column = rendererParams.colDefs[rendererParams.columnIndex]; 
    const isAsync = getIsAsyncDisabled(column.name, props.value); 
    if(isAsync==null || props.columnEditable===false){
        return null
    }
    const id: string = (rendererParams.rowData as any)[RECID];
    const disabledCache = requestManager.getCached(id);
    if(isAsync===true && disabledCache==null){
        requestManager.getRecords(id).then(((cellContainer) => (disabledData)=>{
            if(disabledData?.[column.name]===true){
                console.log(`RequestManager resolved for ${id}: ${disabledData?.[column.name]}`);
                cellContainer?.setAttribute("dianamics_uneditable", "true");
            }
        })((props as any).cellContainerElement));
    }
    else{
        //sync or already cached
        if(isAsync===false || disabledCache?.[column.name]===true){
            (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");
        }
    }    
}


export const generateCellRendererOverrides = (requestManager: RequestManager) => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {                       
            renderDisabledCell(props, rendererParams,  requestManager); 
            return null;
        },
        ["TextArea"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["Email"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["Phone"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["URL"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        }, 
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {            
          renderDisabledCell(props, rendererParams,  requestManager);         
          return null;    
        }, 
        ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {     
           renderDisabledCell(props, rendererParams,  requestManager);
            return null;
        },          
        ["Lookup"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        }, 
        ["MultiSelectPicklist"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        }
        
        //, "Customer", "Owner"
        //, "Integer", "Currency", "Decimal", "FloatingPoint", "AutoNumber", "DateOnly", "DateAndTime"
      
        //"Ticker"
       // "Duration"
       // "Language"
      //  "Multiple"
      // "TimeZone"
      //  "Image"
      //  "File"   
      //"Persona"
      //"RichText"
      //UniqueIdentifier       
    }
    return cellRendererOverrides;
}

