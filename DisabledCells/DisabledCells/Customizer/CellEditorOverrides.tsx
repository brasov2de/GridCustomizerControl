
import * as React from 'react';

import { CellEditorOverrides, CellEditorProps, GetEditorParams, RECID } from './PAGridTypes';
import { RequestManager } from './RequestManager';
import { getIsAsyncDisabled } from './DisabledCellsList';

function renderDisabledCell(defaultProps: CellEditorProps, rendererParams: GetEditorParams, requestManager: RequestManager){    
  const column = rendererParams.colDefs[rendererParams.columnIndex]; 
  const isAsync = getIsAsyncDisabled(column.name, defaultProps.value); 
  if(isAsync==null){ // || defaultProps.columnEditable===false
      return null
  }
  const id: string = (rendererParams.rowData as any)[RECID];
  const disabledCache = requestManager.getCached(id);
  if(isAsync===true && disabledCache==null){
      //the data was requested by the cell renderer, but the promise is not back yet
      //disable the cell fow now
      console.warn(`render for cell editor ${id} is async, but not resolved yet. Cell will be disabled`);
      rendererParams.stopEditing();
      //don't set the styles on disabled yet
  }
  else{
     // sync or already cached
    if(isAsync===false || disabledCache?.[column.name]===true){ 
      rendererParams.stopEditing();
      console.log(`Disabling cell editor ${id} for column ${column.name}. Value: ${defaultProps.value}`, rendererParams.rowData);    
      (defaultProps as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");
    }
    
  }    
}

export const generateCellEditorOverrides = (requestManager: RequestManager)=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {    
      renderDisabledCell(defaultProps, rendererParams, requestManager);            
      return null;
    },
    ["OptionSet"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
     renderDisabledCell(defaultProps, rendererParams, requestManager);
     return null;
    }, 
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
      //renderDisabledCell(defaultProps, rendererParams, requestManager);
      return null;
    }
  }
  return cellEditorOverrides;
}


