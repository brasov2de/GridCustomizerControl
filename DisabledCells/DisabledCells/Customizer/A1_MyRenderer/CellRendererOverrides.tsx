/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from '../PAGridTypes';
import { RequestManager } from '../RequestManager';
import { IDisabledCellInfo, getCellDisabledInfo } from '../DisabledCells';
import { BooleanControl } from '../../Controls/BooleanControl';
import { OptionSetControl } from '../../Controls/OptionsetControl';
import { TextControl } from '../../Controls/TextControl';
import { LinkControl } from '../../Controls/Link';


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
                    requestManager={cellInfo.isAsync ? requestManager : null} 
                    onLabel={(cellInfo.column as any).customizerParams?.labels?.onText} 
                    offLabel={(cellInfo.column as any).customizerParams?.labels?.offText} 
                    value={props.value as boolean|undefined}
                    onClick={props.startEditing}
                />);                      
        }
        return null;        
} 

function textRenderer(props: CellRendererProps, rendererParams: GetRendererParams, requestManager: RequestManager){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    const disabledCache = requestManager.getCached(cellInfo.id);
    if(cellInfo.isAsync===false || disabledCache==null || disabledCache?.[cellInfo.columnName]===true){      
        return (<TextControl 
                    name={cellInfo.columnName}
                    rowId={cellInfo.id}
                    requestManager={cellInfo.isAsync ? requestManager : null} 
                    value={props.value as string}
                    formattedValue={props.formattedValue ?? ""}
                    onClick={props.startEditing}
                />);                      
        }
        return null;        
} 

function linkRenderer(props: CellRendererProps, rendererParams: GetRendererParams, requestManager: RequestManager, url: string, navigate ?: ()=>void){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    const disabledCache = requestManager.getCached(cellInfo.id);
    if(cellInfo.isAsync===false || disabledCache==null || disabledCache?.[cellInfo.columnName]===true){      
        return (<LinkControl 
                    name={cellInfo.columnName}
                    rowId={cellInfo.id}
                    requestManager={cellInfo.isAsync ? requestManager : null} 
                    value={props.value as string}
                    formattedValue={props.formattedValue ?? ""}
                    onClick={props.startEditing}
                    url={url}  
                    navigate={navigate}              
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


export const generateCellRendererOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation) => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {                       
            return textRenderer(props, rendererParams,  requestManager);             
        },
        ["TextArea"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["Email"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, requestManager, `mailto:${props.value}`);
        },
        ["Phone"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, requestManager, `tel:${props.value}`);
        },
        ["URL"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, requestManager, `${props.value}`);
        }, 
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {            
          return optionsetRenderer(props, rendererParams, requestManager);
        }, 
        ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {    
           return booleanRenderer(props, rendererParams, requestManager);
        },          
        ["Lookup"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            const navigate = ()=>{
                navigation.openForm({entityId: (props.value as any)?.id?.guid , entityName: (props.value as any)?.etn ?? ""});
            }
            return linkRenderer(props, rendererParams, requestManager, "", navigate);
        }       
        //MultiSelectPicklist
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

