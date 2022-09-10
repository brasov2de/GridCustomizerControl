import * as React from 'react';

interface IPeopleProps {
   parentId ?: string;
   webAPI: ComponentFramework.WebApi, 
   peopleCache: any;
}
export const People = React.memo(function PeopleRaw({parentId, webAPI, peopleCache}: IPeopleProps){
    const [people, setPeople] = React.useState<Array<any>>(peopleCache[parentId ?? ""] || []);
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {          
        if(parentId && peopleCache[parentId ?? ""]==null){          
            webAPI.retrieveMultipleRecords("systemuser", ["?fetchXml=", 
                `<fetch distinct="false" mapping="logical" returntotalrecordcount="true" page="1" count="5" no-lock="true">`,
                `<entity name="systemuser">`, 
                    `<attribute name="entityimage_url"/>`,
                    `<attribute name="fullname"/>`,            
                    `<attribute name="systemuserid"/>`,            
                    `<link-entity name="diana_pcftester_systemuser" intersect="true" visible="false" to="systemuserid" from="systemuserid">`,
                        `<link-entity name="diana_pcftester" from="diana_pcftesterid" to="diana_pcftesterid" alias="bb">`,
                            `<filter type="and">`,
                                `<condition attribute="diana_pcftesterid" operator="eq" uitype="diana_pcftester" value="${parentId}"/>`,
                            `</filter>`,
                        `</link-entity>`,
                    `</link-entity>`,
                `</entity>`,
            `</fetch>`].join('')).then((result)=>{
                setPeople(result.entities);
                peopleCache[parentId] = result.entities;
                setLoading(false)
            }); 
        }       
        else{
            setLoading(false);
        }
        }, [parentId]);

    return <>{loading === true ? "..." : people.length}</>
});