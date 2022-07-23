import * as React from 'react';
import { CellEditorOverrides, CellEditorProps, GetEditorParams } from './types';

export const cellEditorOverrides: CellEditorOverrides = {
  ["Text"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
    // TODO: Add your custom cell editor overrides here
    return null
  },
  ["OptionSet"]: (defaultProps: CellEditorProps, rendererParams: GetEditorParams) => {
    const cell = rendererParams.colDefs[rendererParams.columnIndex];
    const cellChanged = (e: any)=>{
        const newValue = e.target.value;
        rendererParams.onCellValueChanged(newValue);
        //rendererParams.stopEditing(false)
    }
    // TODO: Add your custom cell editor overrides here
    return (<select onChange={cellChanged}>
        {(cell as any).customizerParams.dropDownOptions.map((option: any)=><option value={option.key}>{option.text}</option>)}        
    </select>)
  }
}
