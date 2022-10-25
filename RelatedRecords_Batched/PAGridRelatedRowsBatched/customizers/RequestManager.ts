

import * as debounce from "debounce-promise"

//https://www.npmjs.com/package/debounce-promise


export class RequestManager{
    private cache = {}    
  webAPI: ComponentFramework.WebApi;
  baseEntity: string;
  baseFetchXml: string;


    constructor(webAPI: ComponentFramework.WebApi, baseEntity: string, baseFetchXml: string){
        this.webAPI = webAPI;
        this.baseEntity = baseEntity;
        this.baseFetchXml = baseFetchXml;
    }

    private debouncedAccumulatedFetch = debounce(async (ids)=>{
      console.log("fetching for ids", ids);      
      const response = await this.webAPI.retrieveMultipleRecords("activitypointer", "?fetchXml=" + [
      `<fetch no-lock="true" aggregate="true" >`,
        `<entity name="task">`,
          `<attribute name="activityid" alias="count" aggregate="count"/>`,
          `<attribute name="regardingobjectid" alias="parentid" groupby="true"/>`,
          `<filter>`,
            `<condition attribute="regardingobjectid" operator="in">`,
              ids.map((id : string)=>`<value>${id}</value>`).join(""),
            `</condition>`,
          `</filter>`,
        `</entity>`,
      `</fetch>`].join(""));      
      response.entities.forEach((entity)=>{
        this.cache[entity.parentid] = entity.count;        
      });
      return ids.map((id)=> {
        if(this.cache[id]==null){
          this.cache[id] = 0;
        }
        return this.cache[id];
      });
    }, 500, {accumulate:true});
   
   
    public async getRecords(id: string){          
      if(Object.hasOwn(this.cache, id)){
        return Promise.resolve(this.cache[id]);
      }
      const results = await this.debouncedAccumulatedFetch(id);
      console.log(id, results);
      return results;
    }    
}