import { GetHeaderParams, GetRendererParams, GridCustomizer, NoRowsOverlayConfig, RECID } from "./types";
import * as React from 'react';
import { DraggableCell } from "./DraggableCell";

/*
export const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
      // TODO: Add your custom cell editor overrides here
      return null
    }
}*/


export class DraggableRowsGridRenderer implements GridCustomizer {
    GetLoadingRowRenderer(): React.ReactElement{
        return <div>Loading...</div>;
    }  
    GetCellRenderer(params: GetRendererParams): React.ReactElement{
        const cellName = params.colDefs[params.columnIndex].name;
        if(cellName==="diana_sortorder"){
            const index = (params.rowData as any)?.diana_sortorder ?? (params as any).rowIndex;
            return (<div>
                <DraggableCell rowId={params.rowData?.[RECID]} rowIndex={index} />         
            </div>)
        }
        else{
            return (<div>                
                {(params.rowData as any)[cellName]}
            </div>)
        }                
    }
   /* GetHeaderRenderer(params: GetHeaderParams): React.ReactElement{
        const colDisplayName = params.colDefs[params.columnIndex].displayName;
        return <div>{colDisplayName}</div>;
    }*/
}