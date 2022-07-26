import * as React from 'react';
import { ColorfulDropDown } from '../Controls/ColorfulDropDown';
import { CellEditorOverrides, CellEditorProps, GetEditorParams } from './types';

export const generateCellEditorOverrides = (colors : any)=>{
  const cellEditorOverrides: CellEditorOverrides = {
    ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
      // TODO: Add your custom cell editor overrides here
      return null
    },
    ["OptionSet"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
      const defaultValue = defaultProps.value as number;
     
      const cell = rendererParams.colDefs[rendererParams.columnIndex];
  
      const options =  (cell as any).customizerParams.dropDownOptions.map((option:any) => { 
        return {
          ...option, data: {color: colors[option.key]}
          }
        });

      const onChange=(value: number | null) =>{
        rendererParams.onCellValueChanged(value);      
        //rendererParams.stopEditing(false);
      }
  
      return <ColorfulDropDown defaultValue={defaultValue} options = {options} onChange={onChange}/>
    
    }
  }
  return cellEditorOverrides;
}


