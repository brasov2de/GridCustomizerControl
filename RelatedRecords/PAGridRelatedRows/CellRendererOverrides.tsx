/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererProps, GetRendererParams, RECID } from './PAGridTypes';
import { IInputs } from './generated/ManifestTypes';
import { People } from './People';



export const generateCellRendererOverrides = (context: ComponentFramework.Context<IInputs>, webAPI: ComponentFramework.WebApi, peopleCache = {}) => {  
 
    return  {       
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {             
            const {columnIndex, colDefs, rowData } = rendererParams;         
            const columnName = colDefs[columnIndex].name;     
            if(columnName !== "diana_relatedusers"){
                return null;
            }
            const parentId = rowData?.[RECID];
            return <People parentId={parentId} webAPI={webAPI} peopleCache={peopleCache}/>
         }        
    }  
}