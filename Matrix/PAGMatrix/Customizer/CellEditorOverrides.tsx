
import * as React from 'react';

import { CellEditorOverrides, CellEditorProps, GetEditorParams, RECID } from './PAGridTypes';
import { RequestManager } from './RequestManager';
import { extractYearFromName } from './ColumnNames';
import { MatrixCellControl } from '../Controls/MatrixCell';
import { TotalCell } from '../Controls/Total';
import { linkRenderer } from './ControlRenderer';


export const generateCellEditorOverrides = (requestManager: RequestManager, navigation: ComponentFramework.Navigation)=>{
  const cellEditorOverrides: CellEditorOverrides = {       
    ["Lookup"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
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
  ["Text"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
      //disabling year column
      //editor vor year columns
      const column = rendererParams.colDefs[rendererParams.columnIndex];     
      const rowData : any = rendererParams.rowData ?? {};                   
     /* if(column.name.startsWith("diana_year") && rowData["diana_value"]! == null){
        rendererParams.stopEditing();
      }
      return null;*/
      if(column.name.startsWith("diana_year") && rowData["diana_value"]== null){ //otherwise is a nested column
          const year = extractYearFromName(column.name);
          return (<MatrixCellControl 
           parentId={rowData[RECID] ?? ""}
           year={year}       
           opportunityId={rowData["diana_opportunityid"] as any ?? ""}         
           requestManager={requestManager}          
           isReadOnly={false}
           />);
      }          
      return null;
  },
  ["Decimal"]: (props: CellEditorProps, rendererParams: GetEditorParams) => {
    rendererParams.stopEditing();
    const column = rendererParams.colDefs[rendererParams.columnIndex];     
    const rowData : any = rendererParams.rowData ?? {};   
    rowData[column.name] = "0";          
    /*const column = rendererParams.colDefs[rendererParams.columnIndex];     
    const rowData : any = rendererParams.rowData ?? {};   
    rowData[column.name] = "0";          
    if(column.name==="diana_volume"){
        return (<TotalCell 
            parentId={rowData[RECID] ?? ""}
            opportunityId={rowData["diana_opportunityid"] as any ?? ""}         
            requestManager={requestManager} 
        />);
    }*/
    return null;  
  }  
  }
  return cellEditorOverrides;
}


