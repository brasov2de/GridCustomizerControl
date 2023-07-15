/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from '../PAGridTypes';
import { RequestManager } from '../RequestManager';
import { IDisabledCellInfo, getCellDisabledInfo } from '../DisabledCells';
import { BooleanControl } from '../../Controls/BooleanControl';
import { OptionSetControl } from '../../Controls/OptionsetControl';
import { TextControl } from '../../Controls/TextControl';
import { LinkControl } from '../../Controls/Link';


function booleanRenderer(props: CellRendererProps, rendererParams: GetRendererParams){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    }     
    return (<BooleanControl 
                name={cellInfo.columnName}
                rowId={cellInfo.id}
                requestManager={null} 
                onLabel={(cellInfo.column as any).customizerParams?.labels?.onText} 
                offLabel={(cellInfo.column as any).customizerParams?.labels?.offText} 
                value={props.value as boolean|undefined}
                onClick={props.startEditing}
            />);                      
            
} 

function textRenderer(props: CellRendererProps, rendererParams: GetRendererParams){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
        return (<TextControl 
                name={cellInfo.columnName}
                rowId={cellInfo.id}
                requestManager={ null} 
                value={props.value as string}
                formattedValue={props.formattedValue ?? ""}
                onClick={props.startEditing}
            />);                      
    }

function linkRenderer(props: CellRendererProps, rendererParams: GetRendererParams,  url: string, navigate ?: ()=>void){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    return (<LinkControl 
                name={cellInfo.columnName}
                rowId={cellInfo.id}
                requestManager={ null} 
                value={props.value as string}
                formattedValue={props.formattedValue ?? ""}
                onClick={props.startEditing}
                url={url}  
                navigate={navigate}              
            />);                      
    
} 

function optionsetRenderer(props: CellRendererProps, rendererParams: GetRendererParams){
    const cellInfo = getCellDisabledInfo(props, rendererParams);
    if(cellInfo==null){
        return null;
    } 
    return (<OptionSetControl 
                name={cellInfo.columnName}
                rowId={cellInfo.id}
                requestManager={null} 
                dropDownOptions={(cellInfo.column as any).customizerParams?.dropDownOptions}
                value={props.value as any}
                formattedValue={props.formattedValue ?? ""}
                onClick={props.startEditing}
            />);                      
   
}


export const generateCellRendererOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation) => {
    const cellRendererOverrides: CellRendererOverrides = {
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {                       
            return textRenderer(props, rendererParams);             
        },
        ["TextArea"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return null;
        },
        ["Email"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, `mailto:${props.value}`);
        },
        ["Phone"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams, `tel:${props.value}`);
        },
        ["URL"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            return linkRenderer(props, rendererParams,  `${props.value}`);
        }, 
        ["OptionSet"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {            
          return optionsetRenderer(props, rendererParams);
        }, 
        ["TwoOptions"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {    
           return booleanRenderer(props, rendererParams);
        },          
        ["Lookup"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            const navigate = ()=>{
                navigation.openForm({entityId: (props.value as any)?.id?.guid , entityName: (props.value as any)?.etn ?? ""});
            }
            return linkRenderer(props, rendererParams, "", navigate);
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

