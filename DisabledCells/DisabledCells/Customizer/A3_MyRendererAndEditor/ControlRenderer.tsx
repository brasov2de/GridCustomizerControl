import * as React from "react";
import { BooleanControl } from "../../Controls/BooleanControl";
import { getCellDisabledInfo } from "../DisabledCells";
import { CellEditorProps, CellRendererProps, GetEditorParams, GetRendererParams, RECID } from "../PAGridTypes";
import { RequestManager } from "../RequestManager";
import { TextControl } from "../../Controls/TextControl";
import { LinkControl } from "../../Controls/Link";
import { OptionSetControl } from "../../Controls/OptionsetControl";


export function booleanRenderer(props: CellRendererProps | CellEditorProps, rendererParams: GetRendererParams| GetEditorParams, requestManager: RequestManager){
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
                    onClick={(props as any).startEditing ?? (props as any).stopEditing}
                />);                      
        }
        return null;        
} 

export function textRenderer(props: CellRendererProps | CellEditorProps, rendererParams: GetRendererParams| GetEditorParams, requestManager: RequestManager){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    const formattedValue = (props as any).formattedValue ??  (cellInfo.column as any).getFormattedValue(cellInfo.rowData?.[RECID]) ?? (cellInfo.rowData as any)[cellInfo.columnName] ?? " ";   
    const disabledCache = requestManager.getCached(cellInfo.id);
    if(cellInfo.isAsync===false || disabledCache==null || disabledCache?.[cellInfo.columnName]===true){      
        return (<TextControl 
                    name={cellInfo.columnName}
                    rowId={cellInfo.id}
                    requestManager={cellInfo.isAsync ? requestManager : null} 
                    value={props.value as string}
                    formattedValue={formattedValue}
                    onClick={(props as any).startEditing ?? (props as any).stopEditing}
                />);                      
        }
        return null;        
} 

export function linkRenderer(props: CellRendererProps | CellEditorProps, rendererParams: GetRendererParams| GetEditorParams, requestManager: RequestManager, url: string, navigate ?: ()=>void){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    const formattedValue = (props as any).formattedValue ??  (cellInfo.column as any).getFormattedValue(cellInfo.rowData?.[RECID]) ?? (cellInfo.rowData as any)[cellInfo.columnName] ?? " ";   
    const disabledCache = requestManager.getCached(cellInfo.id);
    if(cellInfo.isAsync===false || disabledCache==null || disabledCache?.[cellInfo.columnName]===true){      
        return (<LinkControl 
                    name={cellInfo.columnName}
                    rowId={cellInfo.id}
                    requestManager={cellInfo.isAsync ? requestManager : null} 
                    value={props.value as string}
                    formattedValue={formattedValue}
                    onClick={(props as any).startEditing ?? (props as any).stopEditing}
                    url={url}  
                    navigate={navigate}              
                />);                      
        }
        return null;        
} 

export function optionsetRenderer(props: CellRendererProps | CellEditorProps, rendererParams: GetRendererParams| GetEditorParams, requestManager: RequestManager){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    const disabledCache = requestManager.getCached(cellInfo.id);
    const formattedValue = (props as any).formattedValue ??  (cellInfo.column as any).getFormattedValue(cellInfo.rowData?.[RECID]) ?? (cellInfo.rowData as any)[cellInfo.columnName] ?? " ";   
    if(cellInfo.isAsync===false || disabledCache==null || disabledCache?.[cellInfo.columnName]===true){      
        return (<OptionSetControl 
                    name={cellInfo.columnName}
                    rowId={cellInfo.id}
                    requestManager={cellInfo.isAsync ? requestManager : null} 
                    dropDownOptions={(cellInfo.column as any).customizerParams?.dropDownOptions}
                    value={props.value as any}
                    formattedValue={formattedValue}
                    onClick={(props as any).startEditing ?? (props as any).stopEditing}
                />);                      
        }
    return null;    
}
