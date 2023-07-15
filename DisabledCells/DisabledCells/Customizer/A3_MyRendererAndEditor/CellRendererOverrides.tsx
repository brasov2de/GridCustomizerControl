/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from '../PAGridTypes';
import { RequestManager } from '../RequestManager';
import { booleanRenderer, linkRenderer, optionsetRenderer, textRenderer } from './ControlRenderer';


export const generateCellRendererOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation) => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {                       
            return textRenderer(props, rendererParams,  requestManager);             
        },
        ["TextArea"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["Email"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, requestManager, `mailto:${props.value}`);
        },
        ["Phone"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, requestManager, `tel:${props.value}`);
        },
        ["URL"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, requestManager, `${props.value}`);
        }, 
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {            
          return optionsetRenderer(props, rendererParams, requestManager);
        }, 
        ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {    
           return booleanRenderer(props, rendererParams, requestManager);
        },          
        ["Lookup"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            const navigate = ()=>{
                navigation.openForm({entityId: (props.value as any)?.id?.guid , entityName: (props.value as any)?.etn ?? ""});
            }
            return linkRenderer(props, rendererParams, requestManager, "", navigate);
        }       
        //MultiSelectPicklist
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

