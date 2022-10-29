

import * as debounce from "debounce-promise"
import { resolve } from "path";

//https://www.npmjs.com/package/debounce-promise

export class RequestManager{
    private cache = {}    
  webAPI: ComponentFramework.WebApi;
  baseEntity: string;
  baseFetchXml: string;
  aliasParentId: string = "parentid";
  refreshList : Set<string>;
  toRefresh = Array<Promise>;


    constructor(webAPI: ComponentFramework.WebApi, baseEntity: string, baseFetchXml: string, aliasParentId: string = "parentid"){
        this.webAPI = webAPI;
        this.baseEntity = baseEntity;
        this.baseFetchXml = baseFetchXml;
        this.aliasParentId = aliasParentId;
        this.refreshList = new Set<string>();
    }

    private retrieveRecords = async (ids: string[]) => {
      const condition = ids.map((id : string)=>`<value>${id}</value>`).join("");  
      console.log(`%cFetching ${condition}`, "color:#EC407A");
      const response = await this.webAPI.retrieveMultipleRecords(this.baseEntity, "?fetchXml=" + this.baseFetchXml.replace("${IDS}", condition)); 

      response.entities.forEach((entity)=>{
        this.cache[entity[this.aliasParentId]] = entity.count;        
      });

      return ids.map((id)=> {
        if(this.cache[id]==null){
          this.cache[id] = 0;
        }
        return this.cache[id];
      });
    }

    private debouncedAccumulatedFetch = debounce(async (ids)=>{           
      return this.retrieveRecords(ids);
    }, 200, {accumulate:true});
   
   
    public async getRecords(id: string){          
      if(Object.hasOwn(this.cache, id)){
        return Promise.resolve(this.cache[id]);
      }
      const results = await this.debouncedAccumulatedFetch(id);     
      return results;
    }    

    public async refresh(parentId: string){  
      this.cache[parentId] = null;               
      const records = [parentId];
      await this.retrieveRecords(records);            
      return this.cache[parentId];
   }

    /*
   public addToRefreshList(id: string){
      this.refreshList.add(id);
   }

   public async refresh(parentId: string){           
      if(this.refreshList.size>0){ 
          const records = Array.from(this.refreshList);      
          await this.retrieveRecords(records);
          this.refreshList.clear();
      }
      return this.cache[parentId];
   }
   */
  
}