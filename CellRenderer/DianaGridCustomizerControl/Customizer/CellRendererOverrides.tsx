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
                `Lives in ${props.formattedValue}`;
            }
            return null;
        },
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {            
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
                const onCellClicked = () => {
                    if(props.startEditing) props.startEditing();                  
                } 
             const smiley = props.value === "1" ? "Emoji2" : "Sad";
              const label = props.value === "1" ? (column as any).customizerParams.labels.onText : (column as any).customizerParams.labels.offText;             
              return <div onClick={onCellClicked}><Icon iconName={smiley} style={{color: props.value === "1" ? "green" : "red"}}></Icon>{label}</div>
            }
          }
    }
    return cellRendererOverrides;
}

