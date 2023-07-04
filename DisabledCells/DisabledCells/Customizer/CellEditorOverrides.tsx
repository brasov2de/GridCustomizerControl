import { Icon } from '@fluentui/react/lib/components/Icon';
import * as React from 'react';

import { CellEditorOverrides, CellEditorProps, GetEditorParams } from './PAGridTypes';

export const generateCellEditorOverrides = ()=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
      const column = rendererParams.colDefs[rendererParams.columnIndex];  
      console.log(`editable: ${(column as any).columnEditable}`);

      if(column.name=="diana_relatedusers" && defaultProps.value!="123"){
        rendererParams.stopEditing();
      }
      return null;
    },
    ["OptionSet"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
     return null;
    
    }, 
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
     return null;
    }
  }
  return cellEditorOverrides;
}


