
import * as React from 'react';

import { CellEditorOverrides, CellEditorProps, GetEditorParams, RECID } from '../PAGridTypes';
import { RequestManager } from '../RequestManager';
import { getCellDisabledInfo } from '../DisabledCells';

function handleDisableCell(defaultProps: CellEditorProps, rendererParams: GetEditorParams){  
  const cellInfo = getCellDisabledInfo(defaultProps, rendererParams);
  if(cellInfo==null){
      return null;
  }     
  rendererParams.stopEditing(true);           
}

export const generateCellEditorOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation)=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {                       
      handleDisableCell(props, rendererParams);            
      return null;            
  },
  ["TextArea"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams);            
    return null;
  },
  ["Email"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams);            
    return null;
  },
  ["Phone"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams);            
    return null;
  },
  ["URL"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams);             
    return null;
  }, 
  ["OptionSet"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {            
    handleDisableCell(props, rendererParams);          
    return null;
  }, 
  ["TwoOptions"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {    
    handleDisableCell(props, rendererParams);        
    return null;
  },          
  ["Lookup"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    handleDisableCell(props, rendererParams);          
    return null;
  }   
  
  }
  return cellEditorOverrides;
}


