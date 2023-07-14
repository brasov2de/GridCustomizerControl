/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from '../PAGridTypes';
import { RequestManager } from '../RequestManager';
import { IDisabledCellInfo, getCellDisabledInfo } from '../DisabledCells';
import { BooleanControl } from '../../Controls/BooleanControl';
import { OptionSetControl } from '../../Controls/OptionsetControl';

//return value says if the cell is disabled
function handleDisabledRenderer(props: CellRendererProps, rendererParams: GetRendererParams, requestManager: RequestManager): IDisabledCellInfo | null{    
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    }
    const disabledCache = requestManager.getCached(cellInfo.id);
    if(cellInfo.isAsync===true && disabledCache==null){
        requestManager.getRecords(cellInfo.id).then((disabledData)=>{
            if(disabledData?.[cellInfo.columnName]===true){
                console.log(`RequestManager resolved for ${cellInfo.id}: ${disabledData?.[cellInfo.columnName]}`);                
                (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");
            }
        })
    }
    else{
        if(cellInfo.isAsync===false || disabledCache?.[cellInfo.columnName]===true){            
            (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");                        
        }
    }
    return cellInfo;    
}

function booleanRenderer(props: CellRendererProps, rendererParams: GetRendererParams, requestManager: RequestManager){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    const disabledCache = requestManager.getCached(cellInfo.id);
    if(cellInfo.isAsync===false || disabledCache==null || disabledCache?.[cellInfo.columnName]===true){      
        return (<BooleanControl 
                    name={cellInfo.columnName}
                    rowId={cellInfo.id}
                    requestManager={requestManager} 
                    onLabel={(cellInfo.column as any).customizerParams?.labels?.onText} 
                    offLabel={(cellInfo.column as any).customizerParams?.labels?.offText} 
                    value={props.value as boolean|undefined}
                    onClick={props.startEditing}
                />);                      
        }
        return null;        
} 

function optionsetRenderer(props: CellRendererProps, rendererParams: GetRendererParams, requestManager: RequestManager){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    const disabledCache = requestManager.getCached(cellInfo.id);
    if(cellInfo.isAsync===false || disabledCache==null || disabledCache?.[cellInfo.columnName]===true){      
        return (<OptionSetControl 
                    name={cellInfo.columnName}
                    rowId={cellInfo.id}
                    requestManager={cellInfo.isAsync ? requestManager : null} 
                    dropDownOptions={(cellInfo.column as any).customizerParams?.dropDownOptions}
                    value={props.value as any}
                    formattedValue={props.formattedValue ?? ""}
                    onClick={props.startEditing}
                />);                      
        }
    return null;    
}


export const generateCellRendererOverrides = (requestManager: RequestManager) => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {                       
            handleDisabledRenderer(props, rendererParams,  requestManager); 
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
          return optionsetRenderer(props, rendererParams, requestManager);
        }, 
        ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {    
           return booleanRenderer(props, rendererParams, requestManager);
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

