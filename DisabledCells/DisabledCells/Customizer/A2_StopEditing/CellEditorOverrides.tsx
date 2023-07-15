
import * as React from 'react';

import { CellEditorOverrides, CellEditorProps, GetEditorParams, RECID } from '../PAGridTypes';
import { RequestManager } from '../RequestManager';
import { getCellDisabledInfo } from '../DisabledCells';

function handleDisableCell(defaultProps: CellEditorProps, rendererParams: GetEditorParams, requestManager: RequestManager){  
  const cellInfo = getCellDisabledInfo(defaultProps, rendererParams);
  if(cellInfo==null){
      return null;
  }    
  const disabledCache = requestManager.getCached(cellInfo.id);
  if(cellInfo.isAsync===true && disabledCache==null){
      //the data was requested by the cell renderer, but the promise is not back yet
      //console.warn(`render for cell editor ${cellInfo.id} is async, but not resolved yet. Cell will be disabled`);
      rendererParams.stopEditing(true);      
  }
  else{
     // sync or already cached
    if(cellInfo.isAsync===false || disabledCache?.[cellInfo.columnName]===true){ 
      rendererParams.stopEditing(true);    
      (defaultProps as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");
    }
    
  }    
}

export const generateCellEditorOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation)=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {    
      handleDisableCell(defaultProps, rendererParams, requestManager);            
      return null;
    },
    ["OptionSet"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
     handleDisableCell(defaultProps, rendererParams, requestManager);
     return null;
    }, 
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
      //no need to stop editing here, since the user can start editing only if our own cellRenderer allows it      
      return null;
    }
  }
  return cellEditorOverrides;
}


