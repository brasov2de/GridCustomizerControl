/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams } from './PAGridTypes';


export const generateCellRendererOverrides = () => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            // TODO: Add your custom cell editor overrides here
            const column = rendererParams.colDefs[rendererParams.columnIndex];  
            if(props.columnEditable===false){
                return null;
            }
            if(column.name=="diana_relatedusers" && props.value=="PCF"){               
                (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");                  
              }
              if(column.name=="crec8_city" || column.name=="diana_technologycode"){         
                (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");                  
              }
            console.log(`${column.name}  - ${props.columnEditable}`);                 
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
          const column = rendererParams.colDefs[rendererParams.columnIndex];  
          if(props.columnEditable===false){
              return null;
          }
         
            if(column.name=="diana_technologycode"){         
                (props as any).cellContainerElement?.setAttribute("dianamics_uneditable", "true");                  
            }
        
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

