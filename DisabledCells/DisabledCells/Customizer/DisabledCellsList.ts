
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
    if(columnName=="diana_technologycode"){         
        return false;
    }
    if(columnName=="gendercode"){        
        return true;
    }
    if(columnName==="diana_allowmail"){//} && value===true){
        return true;
    }
}