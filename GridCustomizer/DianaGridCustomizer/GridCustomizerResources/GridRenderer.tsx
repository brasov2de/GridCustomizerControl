import { CellEditorOverrides, CellEditorProps, GetEditorParams, GetHeaderParams, GetRendererParams, GridCustomizer, NoRowsOverlayConfig } from "./types";
import * as React from 'react';


export const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
      // TODO: Add your custom cell editor overrides here
      return null
    }
}


export class DianaGridRenderer implements GridCustomizer {
    GetLoadingRowRenderer(): React.ReactElement{
        return <div>Loading...</div>;
    }  
    GetCellRenderer(params: GetRendererParams): React.ReactElement{
        return <div>TEST</div>
    }
    GetHeaderRenderer(params: GetHeaderParams): React.ReactElement{
        return <div>HEADER</div>;
    }
}