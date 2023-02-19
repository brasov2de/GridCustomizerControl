import { GetHeaderParams, GetRendererParams, GridCustomizer, NoRowsOverlayConfig, RECID } from "./types";
import * as React from 'react';
import { DraggableCell } from "../Controls/DraggableCell";
import { IInputs } from "../generated/ManifestTypes";
import { SortableIndex } from "../Requests/Sortables";

/*
export const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
      // TODO: Add your custom cell editor overrides here
      return null
    }
}*/


export const DraggableRowsGridRenderer = (sortables : SortableIndex, context: ComponentFramework.Context<IInputs>) : GridCustomizer  => {    
    return {
    GetLoadingRowRenderer: (): React.ReactElement => {
        return <div>Loading...</div>;
    } , 
    GetCellRenderer : (params: GetRendererParams): React.ReactElement => {
        
        const cellName = params.colDefs[params.columnIndex].name;
        const formattedValue = params.colDefs[params.columnIndex].getFormattedValue(params.rowData?.[RECID]) ?? (params.rowData as any)[cellName];
        if(cellName==="diana_sortorder"){
           
            const index = (params.rowData as any)?.diana_sortorder ?? (params as any).rowIndex;
            sortables.push(params.rowData?.[RECID] ?? "", index); 
            const onDropped = (sourceId: string, targetId : string) => {               
                sortables.move(sourceId, targetId).then(()=>{
                    Array.from(parent.frames).forEach((frame) => {
                        frame.postMessage({
                            messageName: "Dianamics.DragRows", 
                            data: `Dropped ${sourceId} to ${targetId}` }, "*")
                    })    
                });                        
            }
            return (<div>
                <DraggableCell rowId={params.rowData?.[RECID]} rowIndex={index} text={formattedValue} onDropped={onDropped}/>                         
            </div>)
        }
        else{
            return (<div>                
                {formattedValue}
            </div>)
        }                
    }
   /* GetHeaderRenderer : (params: GetHeaderParams): React.ReactElement => {
        const colDisplayName = params.colDefs[params.columnIndex].displayName;
        return <div>{colDisplayName}</div>;
    }*/
}}