import { ColumnDefinition } from "./PAGridTypes";
import * as debounce from "debounce-promise"

const thisYear = new Date().getFullYear();
export function extractYearFromName(columnName: string): string {
    if(columnName==="diana_year"){
        return  thisYear.toString();
    }
    if(columnName.startsWith("diana_year_minus")){
        const year = parseInt(columnName.replace("diana_year_minus_", ""));
        return (thisYear-year).toString();
    }
    if(columnName.startsWith("diana_year_plus")){
        const year = parseInt(columnName.replace("diana_year_plus_", ""));
        return (thisYear+year).toString();
    }
    return columnName;
}


const yearDefinitions = ["diana_year_minus_1", "diana_year", "diana_year_plus_1", "diana_year_plus_2", "diana_year_plus_3", "diana_year_plus_4", "diana_year_plus_5", "diana_year_plus_6"].map((columnName)=>{        
    return [columnName, extractYearFromName(columnName)];   
});
const yearMap = new Map<string, string>(yearDefinitions as any);

export const translateColumnNames = debounce((colDefs: ColumnDefinition[]) => {       
    let found = colDefs.some((colDef) => colDef.name.startsWith("diana_year") && !colDef.displayName?.startsWith("2"));
    if(!found){return; }
    colDefs.forEach((colDef) => {
        if(yearMap.has(colDef.name)){            
            (colDef as any).displayName = yearMap.get(colDef.name);                        
        }
    });        
   
    //@ts-ignore
    const subgrids = [(Xrm as any)?.Page?.ui?.controls?.get("Subgrid_new_1"), (Xrm as any)?.Page?.ui?.controls?.get("Subgrid_new_5"), (Xrm as any)?.Page?.ui?.controls?.get("Subgrid_new_4"), (Xrm as any)?.Page?.ui?.controls?.get("Subgrid_new_6")];
    subgrids.forEach((subgrid: any) => {
        if(subgrid?.refresh){
            subgrid.refresh();
        }
    });

}, 2000);