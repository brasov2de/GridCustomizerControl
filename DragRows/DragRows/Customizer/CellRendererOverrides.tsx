/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { DraggableCell } from './DraggableCell';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from './types';


export const MyCellRenderer = {
        ["Integer"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            const column = rendererParams.colDefs[rendererParams.columnIndex];
            if(column.name==="diana_sortorder"){
               return <DraggableCell rowId={rendererParams.rowData?.[RECID]} rowIndex={props.value} />                                
            }
            return null;
        }
    };

        /*,
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
              const label = props.formattedValue;
              return <div onClick={onCellClicked} style={{textAlign: "center"}}><Icon iconName={smiley} style={{color: props.value === "1" ? "green" : "red"}}></Icon></div>
            }
          }*/
        

