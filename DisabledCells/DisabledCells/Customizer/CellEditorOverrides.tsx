
import * as React from 'react';

import { CellEditorOverrides, CellEditorProps, GetEditorParams } from './PAGridTypes';

export const generateCellEditorOverrides = ()=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {    
      
      const column = rendererParams.colDefs[rendererParams.columnIndex];                    
      console.log(`editable: ${(column as any).columnEditable}`);

      if(column.name=="diana_relatedusers" && defaultProps.value=="PCF"){
        rendererParams.stopEditing();
        (defaultProps as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");  
        return <label>{defaultProps.value}</label>
      }
      if(column.name=="crec8_city" || column.name=="diana_technologycode"){
        rendererParams.stopEditing();
        (defaultProps as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");  
        return <label>{defaultProps.value}</label>
      }
            
      return null;
    },
    ["OptionSet"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
      const column = rendererParams.colDefs[rendererParams.columnIndex];                    
      console.log(`editable: ${(column as any).columnEditable}`);

      if(column.name=="diana_technologycode"){
        rendererParams.stopEditing();
        (defaultProps as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");  
        return <label>{defaultProps.value}</label>
      }
            
      return null;
    
    }, 
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
     return null;
    }
  }
  return cellEditorOverrides;
}


