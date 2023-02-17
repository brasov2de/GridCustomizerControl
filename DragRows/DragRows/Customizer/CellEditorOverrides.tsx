import { Icon } from '@fluentui/react/lib/components/Icon';
import * as React from 'react';
import { DraggableCell } from './DraggableCell';

import { CellEditorOverrides, CellEditorProps, GetEditorParams, RECID } from './types';

export const MyCellEditor : CellEditorOverrides= {
    ["Integer"]:  (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
        const column = rendererParams.colDefs[rendererParams.columnIndex];
            if(column.name==="diana_sortorder"){
               return <DraggableCell rowId={(rendererParams.rowData as any)?.[RECID]} rowIndex={defaultProps.value} text={defaultProps.value as string} stopEdit={rendererParams.stopEditing} setValue={rendererParams.onCellValueChanged}/>                                
            }
            return null;
    }
}