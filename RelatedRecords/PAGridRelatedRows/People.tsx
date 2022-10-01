import * as React from 'react';

interface IPeopleProps {
   parentId ?: string;
   webAPI: ComponentFramework.WebApi, 
   peopleCache: any;
}
export const People = React.memo(function PeopleRaw({parentId, webAPI, peopleCache}: IPeopleProps){
    const [people, setPeople] = React.useState<Array<any> | null>(peopleCache[parentId ?? ""] ?? null); 
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
          //  console.log(`People component unmounted for ${parentId}`);
        };
    }, []);

    React.useEffect(() => {          
        if(parentId && peopleCache[parentId ?? ""]==null){      
            console.log(`%cStarting fetch for ${parentId}`, "color:yellow");    
            webAPI.retrieveMultipleRecords("systemuser", ["?fetchXml=", 
                `<fetch distinct="false" mapping="logical" returntotalrecordcount="true" page="1" count="5" no-lock="true">`,
                `<entity name="systemuser">`, 
                    `<attribute name="entityimage_url"/>`,
                    `<attribute name="fullname"/>`,            
                    `<attribute name="systemuserid"/>`,            
                    `<link-entity name="diana_pcftester_systemuser" intersect="true" visible="false" to="systemuserid" from="systemuserid">`,                       
                        `<filter type="and">`,
                            `<condition attribute="diana_pcftesterid" operator="eq" uitype="diana_pcftester" value="${parentId}"/>`,
                        `</filter>`,                       
                    `</link-entity>`,
                `</entity>`,
            `</fetch>`].join('')).then((result)=>{
                peopleCache[parentId ?? ""] = result.entities;
                if(mounted.current){
                    setPeople(result.entities);                    
                }
              /*  else {
                    console.log(`%cPeople component unmounted before data returned for ${parentId}`, "color:red");
                }*/
            }); 
        }
      /*  else {
            console.log(`%cUsing cache data for ${parentId}`, "color:green");
        }  */     
        }, [parentId]);

    return (<div>
        {people == null 
            ? "..." 
            : people.map((person)=> person.entityimage_url 
                ? <img src={person.entityimage_url} style={{height: "32px", width:"32px", backgroundColor: "gray", borderRadius: "15px", margin: "1px"}}/>
                : null
                ) 
        }</div>);
});