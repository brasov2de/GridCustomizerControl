
import * as React from 'react';

import { CellEditorOverrides, CellEditorProps, GetEditorParams, RECID } from '../PAGridTypes';
import { RequestManager } from '../RequestManager';
import { booleanRenderer, linkRenderer, optionsetRenderer, textRenderer } from './ControlRenderer';

export const generateCellEditorOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation)=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {                       
      return textRenderer(props, rendererParams,  requestManager);             
  },
  ["TextArea"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
      return null;
  },
  ["Email"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
      return linkRenderer(props, rendererParams, requestManager, `mailto:${props.value}`);
  },
  ["Phone"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
      return linkRenderer(props, rendererParams, requestManager, `tel:${props.value}`);
  },
  ["URL"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
      return linkRenderer(props, rendererParams, requestManager, `${props.value}`);
  }, 
  ["OptionSet"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {            
    return optionsetRenderer(props, rendererParams, requestManager);
  }, 
  ["TwoOptions"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {    
     return booleanRenderer(props, rendererParams, requestManager);
  },          
  ["Lookup"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
      const navigate = ()=>{
          navigation.openForm({entityId: (props.value as any)?.id?.guid , entityName: (props.value as any)?.etn ?? ""});
      }
      return linkRenderer(props, rendererParams, requestManager, "", navigate);
  }       
  
  }
  return cellEditorOverrides;
}


