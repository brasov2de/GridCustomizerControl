import { Dropdown, IDropdown, IDropdownOption } from '@fluentui/react/lib/components/Dropdown';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { ISelectableOption } from '@fluentui/react/lib/utilities/selectableOption';
import * as React from 'react';
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

      const _onSelectedChanged = (event: any, option?: IDropdownOption) => {       
        const val = (option?.key == null || option?.key===-1) ? null : option?.key as number;   
        rendererParams.onCellValueChanged(val);      
        rendererParams.stopEditing(false);
      }
     /* const cellChanged = (e: any)=>{
          const newValue = e.target.value;
          rendererParams.onCellValueChanged(newValue);
          //rendererParams.stopEditing(false)
      }*/
      // TODO: Add your custom cell editor overrides here
    /*  return (<select onChange={cellChanged}>
          {(cell as any).customizerParams.dropDownOptions.map((option: any)=><option value={option.key}>{option.text}</option>)}        
      </select>)*/

      const _renderOption =(option: ISelectableOption | undefined, className ?:string) : JSX.Element => {             
        const color =  option?.data?.color || "gray";
        return (
          <div className={className}>
              <Icon className="colorIcon" style={{color: color, marginRight: "8px"}} iconName="CircleShapeSolid" aria-hidden="true" />          
            <span>{option?.text || ""}</span>
          </div>
        );  
      }

      const _onRenderOption = (option: ISelectableOption | undefined): JSX.Element => {
        return _renderOption(option, "ORBIS_ColorfulOptionset_item")
      };
     
      const _onRenderTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
        const option = (options || [])[0];
        return _renderOption(option, "option");
            
      };
    
      return <Dropdown        
          placeHolder="---"         
          options={options}
       //   defaultValue={defaultValue || -1}
          selectedKey={defaultValue}
        //  componentRef={dropdownRef}
        //}  
          onRenderTitle = {_onRenderTitle}            
          onRenderOption = {_onRenderOption}            
          onChange={_onSelectedChanged}                         
         // disabled={isDisabled} 
          className="ComboBox"                        
          //styles = {dropdownStyles}         
      />
    }
  }
  return cellEditorOverrides;
}


