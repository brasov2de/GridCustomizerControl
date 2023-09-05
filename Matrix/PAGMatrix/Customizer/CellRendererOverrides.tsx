/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from './PAGridTypes';
import { RequestManager } from './RequestManager';
import { extractYearFromName, translateColumnNames } from './ColumnNames';
import { linkRenderer } from './ControlRenderer';
import { MatrixCellControl } from '../Controls/MatrixCell';
import { TotalCell } from '../Controls/Total';


export const generateCellRendererOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation) => {
    const cellRendererOverrides: CellRendererOverrides = {
                
        ["Lookup"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            //showing disabled state
            //showing colors for scenario lookup
            const column = rendererParams.colDefs[rendererParams.columnIndex];
            const navigate = ()=>{
                navigation.openForm({entityId: (props.value as any)?.id?.guid , entityName: (props.value as any)?.etn ?? ""});
            }
            if(column.name==="diana_scenarioid"){
                //translateColumnNames(rendererParams.colDefs);
                return linkRenderer(props, rendererParams, requestManager, "", navigate);
            }
           
            return null;
            
        },
        ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            //disabling year column
            //editor vor year columns
            const column = rendererParams.colDefs[rendererParams.columnIndex];     
            const rowData : any = rendererParams.rowData ?? {};                   
            if(column.name.startsWith("diana_year") && rowData["diana_value"]== null){ //otherwise is a nested column
                const year = extractYearFromName(column.name);
                (rendererParams.rowData as any)[column.name] = "0";
                return (<MatrixCellControl 
                 parentId={rowData[RECID] ?? ""}
                 year={year}       
                 opportunityId={rowData["diana_opportunityid"] as any ?? ""}         
                 requestManager={requestManager}     
                 isReadOnly={true}             
                 onClick={props.startEditing}
                 />);
            }          
            return null;
        },
        ["Decimal"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
            const column = rendererParams.colDefs[rendererParams.columnIndex];     
            const rowData : any = rendererParams.rowData ?? {};  
            rowData[column.name] = "0";          
            if(column.name==="diana_volume"){
                return (<TotalCell 
                    parentId={rowData[RECID] ?? ""}
                    opportunityId={rowData["diana_opportunityid"] as any ?? ""}         
                    requestManager={requestManager} 
                />);
            }
            return null; 
        }     
    }
    return cellRendererOverrides;
}

