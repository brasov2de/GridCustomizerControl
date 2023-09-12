/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams } from './types';
import { Icon} from "@fluentui/react/lib/Icon";

export const generateCellRendererOverrides = (colors : any) => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            // TODO: Add your custom cell editor overrides here
            const column = rendererParams.colDefs[rendererParams.columnIndex];
            if(column.name==="diana_city"){
                return <label>`Lives in ${props.formattedValue}`</label>;
            }
            return null;
        },
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {     
            console.log("render optionset", rendererParams.rowData);       
           const onCellClicked = (event?: React.MouseEvent<HTMLElement, MouseEvent> | MouseEvent) => {
                if(props.startEditing) props.startEditing();
                console.log("onCellClicked----------");
            } 
            return (<div onClick={onCellClicked}>
                <Icon style={{color: colors[props.value as number] ?? "gray", marginRight: "8px"}} iconName="CircleShapeSolid" aria-hidden="true" /> 
                {props.formattedValue}
            </div>)             
        }, 
        ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {                 
            const column = rendererParams.colDefs[rendererParams.columnIndex];                         
            if(column.name==="diana_ishappy"){  
                console.log("render boolean", rendererParams.rowData);                    
                const onCellClicked = () => {                    
                    if(props.startEditing) props.startEditing(!props.value);                  
                } 
             const smiley = props.value ? "Emoji2" : "Sad";
              const label = props.formattedValue;
              return <div onClick={onCellClicked} style={{textAlign: "center"}}><Icon iconName={smiley} style={{color: props.value  ? "green" : "red"}}></Icon></div>
            }
          }
    }
    return cellRendererOverrides;
}

