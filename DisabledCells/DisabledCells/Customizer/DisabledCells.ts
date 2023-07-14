import { CellEditorProps, CellRendererProps, ColumnDataType, ColumnDefinition, GetEditorParams, GetRendererParams, RECID } from "./PAGridTypes";

export interface IDisabledCellInfo {
    columnName: string;
    value: any;
    isAsync : boolean;
    column: ColumnDefinition;
    rowData: any;
    dataType: ColumnDataType | undefined;
    id: string;
}

//returns
//true : is disabled async
//false : is disabled sync
//undefined : is not disabled
export function getCellDisabledInfo(props: CellRendererProps | CellEditorProps, rendererParams: GetRendererParams | GetEditorParams ): IDisabledCellInfo | undefined{
    const column = rendererParams.colDefs[rendererParams.columnIndex]; 
    const columnName = column.name;
    const value = props.value;
    const isAsync = columnName=="gendercode" || columnName==="diana_allowmail" || columnName=="diana_technologycode";
    const isSync = (column.name=="diana_relatedusers" && props.value=="PCF") || columnName=="crec8_city" || columnName=="emailaddress1" || columnName=="telephone1" || columnName=="parentcustomerid";

    if((!isAsync && !isSync) || ((props as CellRendererProps).columnEditable===false || (column as any).editable===false)){
        return undefined;
    }
    return {
        columnName: columnName,
        value: value,
        isAsync: isAsync,
        column: column,
        rowData: (props as any).rowData, 
        dataType: props.columnDataType,
        id : (rendererParams.rowData as any)[RECID]
    }   
}