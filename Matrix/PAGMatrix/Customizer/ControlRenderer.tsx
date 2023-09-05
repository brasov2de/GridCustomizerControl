import * as React from "react";

import { LinkControl } from "../Controls/Link";
import { CellEditorProps, CellRendererProps, GetEditorParams, GetRendererParams, RECID } from "./PAGridTypes";
import { RequestManager } from "./RequestManager";



export function linkRenderer(props: CellRendererProps | CellEditorProps, rendererParams: GetRendererParams| GetEditorParams, requestManager: RequestManager, url: string, navigate ?: ()=>void){    
    const column = rendererParams.colDefs[rendererParams.columnIndex];
    const rowData = (rendererParams as any).rowData
    const formattedValue = (props as any).formattedValue ??  (column as any).getFormattedValue(rowData?.[RECID]) ?? (rowData)[column.name] ?? " ";  
    const colorColumn = rendererParams.colDefs.find((col)=>col.name.includes("diana_color")); 
        return (<LinkControl 
                    name={column.name}
                    rowId={rowData?.[RECID]}
                    requestManager={requestManager} 
                    value={props.value as string}
                    formattedValue={formattedValue}
                    onClick={(props as any).startEditing ?? (props as any).stopEditing}
                    url={url}  
                    navigate={navigate}   
                    color={rowData[colorColumn?.name ?? "diana_color"]??""}
                />);                      
        }
    

