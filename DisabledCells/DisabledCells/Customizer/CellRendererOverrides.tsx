/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from './PAGridTypes';
import { RequestManager } from './RequestManager';
import { getIsAsyncDisabled } from './DisabledCellsList';
import { BooleanDisabledControl } from './BooleanControl';

//return value says if the cell is disabled
function renderDisabledCell(props: CellRendererProps, rendererParams: GetRendererParams, requestManager: RequestManager){    
    const column = rendererParams.colDefs[rendererParams.columnIndex]; 
    const isAsync = getIsAsyncDisabled(column.name, props.value); 
    if(isAsync==null || props.columnEditable===false){
        return null;
    }
    const dataType = column.dataType;
    const id: string = (rendererParams.rowData as any)[RECID];
    const disabledCache = requestManager.getCached(id);
    if(isAsync===true && disabledCache==null){
        requestManager.getRecords(id).then((disabledData)=>{
            if(disabledData?.[column.name]===true){
                console.log(`RequestManager resolved for ${id}: ${disabledData?.[column.name]}`);                
                (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");
            }
        });
        return true;
    }
    else{
        //sync or already cached
        if(isAsync===false || disabledCache?.[column.name]===true){            
            (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");            
            return true;
        }
        return false;
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
            const column = rendererParams.colDefs[rendererParams.columnIndex]; 
            const isAsync = getIsAsyncDisabled(column.name, props.value); 
            if(isAsync==null || props.columnEditable===false){
                    return null;
            }     
            const id: string = (rendererParams.rowData as any)[RECID];
            const disabledCache = requestManager.getCached(id);
            if(isAsync===false || disabledCache==null || disabledCache?.[column.name]===true){      
                return (<BooleanDisabledControl 
                            name={column.name}
                            rowId={id}
                            requestManager={requestManager} 
                            onLabel={(rendererParams.colDefs[rendererParams.columnIndex] as any).customizerParams?.labels?.onText} 
                            offLabel={(rendererParams.colDefs[rendererParams.columnIndex] as any).customizerParams?.labels?.offText} 
                            value={props.value as boolean|undefined}
                            onClick={props.startEditing}
                        />);                      
                }
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

