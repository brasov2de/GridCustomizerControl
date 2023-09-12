import { Icon } from '@fluentui/react/lib/components/Icon';
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
      console.log("Editor optionset", rendererParams.rowData);
      const defaultValue = defaultProps.value as number;
     
      const cell = rendererParams.colDefs[rendererParams.columnIndex];
  
      const options =  (cell as any).customizerParams.dropDownOptions.map((option:any) => { 
        return {
          ...option, data: {color: colors[option.key]}
          }
        });

      const onChange=(value: number | null) =>{
        rendererParams.onCellValueChanged(value);              
      }
  
      return <ColorfulDropDown defaultValue={defaultValue} options = {options} onChange={onChange}/>
    
    }, 
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
      const column = rendererParams.colDefs[rendererParams.columnIndex];             
      if(column.name==="diana_ishappy"){    
        console.log("Editor boolean", rendererParams.rowData);    
        const value  = defaultProps.value == true;      
        rendererParams.onCellValueChanged(value); //autochange value on click
        const smiley = value ? "Emoji2" : "Sad";
        const label = value ? (column as any).customizerParams.labels.onText : (column as any).customizerParams.labels.offText;
        const onChange=() =>{          
          rendererParams.onCellValueChanged(!value);      
          rendererParams.stopEditing(false); //no rerender without this.
        }
        return <div onClick={onChange} style={{textAlign: "center"}}><Icon iconName={smiley} style={{color: value === true ? "green" : "red"}}></Icon></div>
      }
    }
  }
  return cellEditorOverrides;
}


