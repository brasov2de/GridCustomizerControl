
//returns
//true : is disabled async
//false : is disabled sync
//undefined : is not disabled
export function getIsAsyncDisabled(columnName: string, value: any): boolean | undefined{
    if(columnName=="diana_relatedusers" && value=="PCF"){
        return false;
    }
    if(columnName=="crec8_city" || columnName=="diana_technologycode"){
        return false;
    }
    if(columnName=="diana_technologycode" || columnName=="diana_allowmail"){         
        return false;
    }
    if(columnName=="gendercode"){        
        return true;
    }
}