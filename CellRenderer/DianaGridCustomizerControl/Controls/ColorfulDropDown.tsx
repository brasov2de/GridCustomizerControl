import * as React from 'react';
import { Dropdown, IDropdown, IDropdownOption } from '@fluentui/react/lib/components/Dropdown';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { ISelectableOption } from '@fluentui/react/lib/utilities/selectableOption';

export interface IColorfulDropDownProps {
    defaultValue : number | null;
    options : Array<any>;
    onChange : (value: number | null) => void;
}

export const ColorfulDropDown=({defaultValue, options, onChange}: IColorfulDropDownProps) : JSX.Element => {
   const [value, setValue] = React.useState(defaultValue);
    const _onSelectedChanged = (event: any, option?: IDropdownOption) => {       
      const val = (option?.key == null || option?.key===-1) ? null : option?.key as number;   
     onChange(val);
     setValue(val);
    }


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
        defaultValue={defaultValue || -1}
        selectedKey={value}
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