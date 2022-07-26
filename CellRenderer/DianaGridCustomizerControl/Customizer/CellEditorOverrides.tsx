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
    
    }, 
    ["TwoOptions"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {     
      const column = rendererParams.colDefs[rendererParams.columnIndex];             
      if(column.name==="diana_ishappy"){        
        const value  = defaultProps.value as string === "1" ? false : true;      
        rendererParams.onCellValueChanged(value===true ? "1" : "0"); //autochange value on click
        const smiley = value === true ? "Emoji2" : "Sad";
        const label = value === true ? (column as any).customizerParams.labels.onText : (column as any).customizerParams.labels.offText;
        const onChange=() =>{          
          rendererParams.onCellValueChanged(value ? "0" : "1");      
          rendererParams.stopEditing(false);
        }
        return <div onClick={onChange}><Icon iconName={smiley} style={{color: value === true ? "green" : "red"}}></Icon>{label}</div>
      }
    }
  }
  return cellEditorOverrides;
}


