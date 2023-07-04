/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams } from './PAGridTypes';


export const generateCellRendererOverrides = () => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            // TODO: Add your custom cell editor overrides here
            const column = rendererParams.colDefs[rendererParams.columnIndex];  
            console.log(`${column.name}  - ${props.columnEditable}`);
            (props.onCellClicked as any) = (event?: React.MouseEvent<HTMLElement, MouseEvent> | MouseEvent) => {
                console.log("onCellClicked");
                event?.preventDefault();
            }        
            return null;
        },
        ["TextArea"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["Email"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["Phone"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["URL"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        }, 
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {            
          const f = props.formattedValue;
          return null;        
        }, 
        ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {     
            const p = props.formattedValue
            return null;
        },          
        ["Lookup"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        }, 
        ["MultiSelectPicklist"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        }
        
        //, "Customer", "Owner"
        //, "Integer", "Currency", "Decimal", "FloatingPoint", "AutoNumber", "DateOnly", "DateAndTime"
      
        //"Ticker"
       // "Duration"
       // "Language"
      //  "Multiple"
      // "TimeZone"
      //  "Image"
      //  "File"   
      //"Persona"
      //"RichText"
      //UniqueIdentifier       
    }
    return cellRendererOverrides;
}

