
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
    }
    
  }    
}

export const generateCellEditorOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation)=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {                       
      handleDisableCell(props, rendererParams, requestManager);            
      return null;            
  },
  ["TextArea"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams, requestManager);            
    return null;
  },
  ["Email"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams, requestManager);            
    return null;
  },
  ["Phone"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams, requestManager);            
    return null;
  },
  ["URL"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams, requestManager);             
    return null;
  }, 
  ["OptionSet"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {            
    handleDisableCell(props, rendererParams, requestManager);          
    return null;
  }, 
  ["TwoOptions"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {    
    handleDisableCell(props, rendererParams, requestManager);        
    return null;
  },          
  ["Lookup"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams, requestManager);          
    return null;
  }   
  
  }
  return cellEditorOverrides;
}


